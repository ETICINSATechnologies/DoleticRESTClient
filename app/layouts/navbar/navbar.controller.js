(function() {
    'use strict';

    angular
        .module('doleticApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'ModalService'];

    function NavbarController($scope, ModalService) {

        $scope.showAbout = function() {
            ModalService.showModal({
                templateUrl: "app/layouts/about-modal/about-modal.template.html",
                controller: "aboutModalController"
            }).then(function(modal) {
                console.log(modal);
                $('#about_doletic_modal').modal('show');
            }).catch(function(error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };
    }
})();
