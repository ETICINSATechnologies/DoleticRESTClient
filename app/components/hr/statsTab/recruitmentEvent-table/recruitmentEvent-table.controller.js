(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrRecruitmentEventTableController', hrRecruitmentEventTableController);

    hrRecruitmentEventTableController.$inject = ['$scope', '$filter', 'RecruitmentEventService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ConfirmModalService', 'MessageBoxService', 'ModalService', 'RHService'];

    function hrRecruitmentEventTableController($scope, $filter, RecruitmentEventService, DTOptionsBuilder, DTColumnDefBuilder, ConfirmModalService, MessageBoxService, ModalService, RHService) {
        $scope.recruitmentEventService = RecruitmentEventService;
        $scope.rhService = RHService;
        $scope.editMode = false;

        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(10);
        $scope.dtColumnDefs = [];

        $scope.showRecruitmentEventForm = function(editMode, event) {
            $scope.event = event ? angular.copy(event) : {};
            if(editMode) {
                formatRecruitmentEvent();
                $scope.editMode = editMode;
            }
            console.log($scope.event);
        };

        $scope.cancelRecruitmentEventForm = function() {
            delete $scope.event;
            $scope.editMode = false;
        };

        $scope.addRecruitmentEvent = function() {
            RecruitmentEventService.postRecruitmentEvent($scope.event).success(function(data) {
                MessageBoxService.showSuccess(
                    "Ajout réussi !",
                    "L'AGR a été ajoutée."
                );
                delete $scope.event;
            }).error(function(data) {
                MessageBoxService.showError(
                    "Echec de l'ajout...",
                    "L'AGR n'a pas pu être ajoutée."
                );
            });
        };

        $scope.updateRecruitmentEvent = function() {
            RecruitmentEventService.putRecruitmentEvent($scope.event).success(function(data) {
                MessageBoxService.showSuccess(
                    "Modification réussie !",
                    "L'AGR a été modifiée."
                );
                delete $scope.event;
                $scope.editMode = false;
            }).error(function(data) {
                MessageBoxService.showError(
                    "Echec de la modification...",
                    "L'AGR n'a pas pu être modifiée."
                );
            });
        };

        $scope.deleteRecruitmentEvent = function (recruitmentEvent) {
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer l'AGR ?",
                "remove",
                function () {
                    RecruitmentEventService.deleteRecruitmentEvent(recruitmentEvent).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Suppression réussie !",
                            "L'AGR a été supprimée."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la suppression...",
                            "L'AGR n'a pas pu être supprimée."
                        );
                    });
                }
            );
        };

        function formatRecruitmentEvent() {
            if ($scope.event.date) $scope.event.date = $filter('date')($scope.event.date, "dd/MM/y");
        }

        RecruitmentEventService.getAllRecruitmentEvents(true);
    }
})();
