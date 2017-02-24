(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcProspectTableController', grcProspectTableController);

    grcProspectTableController.$inject = ['$scope', '$state', 'ContactService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ConfirmModalService', 'ModalService', 'MessageBoxService', 'GRCService', 'UserService'];

    function grcProspectTableController($scope, $state, ContactService, DTOptionsBuilder, DTColumnDefBuilder, ConfirmModalService, ModalService, MessageBoxService, GRCService, UserService) {
        $scope.contactService = ContactService;
        $scope.grcService = GRCService;
        $scope.userService = UserService;

        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(25)
            .withOption('stateSave', true);
        $scope.dtColumnDefs = [];

        $scope.deleteProspect = function (id) {
            var name = ContactService.prospects[id].fullName;
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer le prospect " + name + " ?",
                "remove user",
                function () {
                    ContactService.deleteProspect(id).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Suppression réussie !",
                            "Le prospect " + name + " a été supprimé."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la suppression...",
                            "Le prospect " + name + " n'a pas pu être supprimé. Vérifiez qu'il n'est pas référencé ailleurs."
                        );
                    });
                }
            );
        };

        $scope.showProspectForm = function (prospect) {
            ModalService.showModal({
                templateUrl: "app/components/grc/prospectTab/prospect-form/prospect-form.template.html",
                controller: "grcProspectFormController",
                inputs: {
                    editMode: true,
                    prospect: angular.copy(prospect)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.toContactedProspect = function (prospect) {
            var name = prospect.fullName;
            ConfirmModalService.showConfirmModal(
                "Confirmer la modification",
                "Voulez-vous vraiment marquer le prospect " + name + " comme contacté ?",
                "call",
                function () {
                    ContactService.prospectToContactedProspect(prospect).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Modification réussie !",
                            "Le prospect " + name + " a été marqué comme contacté."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la modification...",
                            "Le prospect " + name + " n'a pas pu être marqué comme contacté."
                        );
                    });
                }
            );
        };

        ContactService.getAllProspects(true);
    }
})();
