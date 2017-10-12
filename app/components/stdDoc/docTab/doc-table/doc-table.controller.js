(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('stdDocTableController', stdDocTableController);

    stdDocTableController.$inject = ['$scope', 'DocumentTemplateService', 'DTOptionsBuilder', 'ConfirmModalService', 'MessageBoxService', 'ModalService', 'KernelService'];

    angular.module('doleticApp').filter('orderTemplateBy', function() {
        return function(items, field, reverse) {
            var filtered = [];
            angular.forEach(items, function(item) {
                filtered.push(item);
            });
            filtered.sort(function (a, b) {
                return (a[field] > b[field] ? 1 : -1);
            });
            if(reverse) filtered.reverse();
            return filtered;
        };
    });

    function stdDocTableController($scope, DocumentTemplateService, DTOptionsBuilder, ConfirmModalService, MessageBoxService, ModalService, KernelService) {
        $scope.documentTemplateService = DocumentTemplateService;
        $scope.kernelService = KernelService;
        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(25)
            .withColumnFilter({
                aoColumns:[
                    {type: "text"},
                    {type: "text"},
                    {type: "text"},
                    {type: "text"},
                    {type: "reset-button"}
                ]
            });
        $scope.dtColumnDefs = [];

        $scope.disableDocumentTemplate = function (template) {
            ConfirmModalService.showConfirmModal(
                "Confirmer la dépréciation",
                "Voulez-vous vraiment déprécier cette version de " + template.label + " ?",
                "version dépréciée",
                function(){
                    DocumentTemplateService.disableDocumentTemplate(template.id)
                }
            )
        };

        $scope.updateDocumentTemplate = function (template) {
            ModalService.showModal({
                templateUrl: "app/components/stdDoc/docTab/doc-form/doc-form.template.html",
                controller: "stdDocFormController",
                inputs: {
                    editMode: true,
                    template: angular.copy(template)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });

        }

        $scope.downloadDocumentTemplate = function(template){
            DocumentTemplateService.downloadDocumentTemplate(template);

        }

        $scope.isUserAdministrator = function(user) {
            if(user.administrator == 2) {
                return "Oui";
            } else if(user.administrator == 1) {
                return "Invalide";
            }
            return "Non";
        };

        $scope.isUserConsultant = function(user) {
            if(user.consultant == 2) {
                return "Oui";
            } else if(user.consultant == 1) {
                return "Invalide";
            }
            return "Non";
        };

        $scope.isUserInvalid = function(user) {
            return user.consultant == 1 || user.administrator == 1;
        };
    }
})();
