(function() {
    'use strict';

    angular
        .module('doleticApp')
        .service('MessageBoxService', messageBoxService);

    messageBoxService.$inject = ['SharedVariables', '$timeout'];

    function messageBoxService(SharedVariables, $timeout) {

        var service = this;

        service.showError = function(title, content) {
            SharedVariables.messageBox.title = title;
            SharedVariables.messageBox.content = content;
            SharedVariables.messageBox.color = "error";
            SharedVariables.messageBox.show = true;
            $timeout(service.hide, 2000);
        };

        service.showInfo = function(title, content) {
            SharedVariables.messageBox.title = title;
            SharedVariables.messageBox.content = content;
            SharedVariables.messageBox.color = "info";
            SharedVariables.messageBox.show = true;
            $timeout(service.hide, 2000);
        };

        service.showSuccess = function(title, content) {
            SharedVariables.messageBox.title = title;
            SharedVariables.messageBox.content = content;
            SharedVariables.messageBox.color = "success";
            SharedVariables.messageBox.show = true;
            $timeout(service.hide, 2000);
        };

        service.hide = function() {
            SharedVariables.messageBox.show = false;
        };

    }

})();