(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrTeamTableController', hrTeamTableController);

    hrTeamTableController.$inject = ['$scope', '$state', 'TeamService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ConfirmModalService', 'MessageBoxService'];

    function hrTeamTableController($scope, $state, TeamService, DTOptionsBuilder, DTColumnDefBuilder, ConfirmModalService, MessageBoxService) {
        $scope.userService = TeamService;
        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(20);
        $scope.dtColumnDefs = [];

        $scope.showTeamForm = function(team) {
            ModalService.showModal({
                templateUrl: "app/components/hr/teamsTab/team-form/team-form.template.html",
                controller: "hrTeamFormController",
                inputs: {
                    editMode: true,
                    team: angular.copy(team)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.deleteProspect = function (team) {
            var name = team.name;
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer l'équipe " + name + " ?",
                "remove",
                function () {
                    TeamService.deleteTeam(id).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Suppression réussie !",
                            "L'équipe " + name + " a été supprimée."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la suppression...",
                            "L'équipe " + name + " n'a pas pu être supprimée."
                        );
                    });
                }
            );
        };

        TeamService.getAllTeams(true);
    }
})();
