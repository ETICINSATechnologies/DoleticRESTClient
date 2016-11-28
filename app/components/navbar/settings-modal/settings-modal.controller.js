(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('SettingsModalController', SettingsModalController);

    SettingsModalController.$inject = ['$scope'];

    function SettingsModalController($scope) {
        $scope.hideSettingsModal = hideSettingsModal;

        function hideSettingsModal() {
            $('#settings_modal').modal('hide');
        }
    }
})();