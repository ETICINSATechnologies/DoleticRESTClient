(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('aboutModalController', aboutModalController);

    aboutModalController.$inject = ['$scope'];

    function aboutModalController($scope) {
        $scope.hideAboutDoletic = hideAboutDoletic;

        function hideAboutDoletic() {
            $('#about_doletic_modal').modal('hide');
        }
    }
})();