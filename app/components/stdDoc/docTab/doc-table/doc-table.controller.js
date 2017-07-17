(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('stdDocTableController', stdDocTableController);

    stdDocTableController.$inject = ['$scope', 'DocumentTemplateService', 'DTOptionsBuilder', 'ConfirmModalService', 'MessageBoxService', 'ModalService', 'KernelService'];

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

        $scope.disableDocument = function (doc) {
            var name = doc.label;
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment déprécier cette version de " + name + " ?",
                "delete version",
                function () {
                    UserService.disabledDoc(doc).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Suppression réussie !",
                            "Le document " + name + " est désormais déprécié."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la suppression ...",
                            "Le document " + name + " est désormais déprécié."
                        );
                    });
                }
            )
        };

        $scope.showDocForm = function(doc) {
            ModalService.showModal({
                templateUrl: "app/components/stdDoc/docTab/doc-form/doc-form.template.html",
                controller: "stdDocFormController",
                inputs: {
                    editMode: true,
                    user: angular.copy(doc)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

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
