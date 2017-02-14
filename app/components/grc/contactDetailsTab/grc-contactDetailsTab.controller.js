(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcContactDetailsTabController', grcContactDetailsTabController);

    grcContactDetailsTabController.$inject = ['$scope', '$state', 'MessageBoxService', 'ContactService'];

    function grcContactDetailsTabController($scope, $state, MessageBoxService, ContactService) {

        $scope.contactService = ContactService;

        $scope.loadContact = function () {
            ContactService.getContactDetails($state.params.id, true).success(function (data) {

            }).error(function (data) {
                MessageBoxService.showError(
                    "Echec du chargement",
                    "Le contact n'a pas pu être chargé. Il est possible qu'un autre utilisateur vienne de le supprimer."
                );
            });
        };
    }
})();