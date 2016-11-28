(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('AboutModalController', AboutModalController);

    AboutModalController.$inject = ['$scope'];

    function AboutModalController($scope) {
        $scope.hideAboutDoletic = hideAboutDoletic;

        function hideAboutDoletic() {
            $('#about_doletic_modal').modal('hide');
        }
    }
})();