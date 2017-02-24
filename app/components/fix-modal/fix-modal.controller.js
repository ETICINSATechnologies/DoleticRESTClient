(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('FixModalController', FixModalController);

    FixModalController.$inject = ['$scope'];

    function FixModalController($scope) {
        $scope.fixModal = function (event) {
            $(event.target).closest('.ui.modal').modal('refresh');
        };
    }
})();