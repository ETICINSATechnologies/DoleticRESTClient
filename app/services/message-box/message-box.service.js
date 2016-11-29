(function () {
    'use strict';

    angular
        .module('doleticApp')
        .service('MessageBoxService', messageBoxService);

    messageBoxService.$inject = ['$timeout'];

    function messageBoxService($timeout) {

        var service = this;

        service.title = null;
        service.content = null;
        service.color = "info";
        service.show = false;

        service.showError = function (title, content) {
            service.title = title;
            service.content = content;
            service.color = "error";
            service.show = true;
            $timeout(service.hide, 2000);
        };

        service.showInfo = function (title, content) {
            service.title = title;
            service.content = content;
            service.color = "info";
            service.show = true;
            $timeout(service.hide, 2000);
        };

        service.showSuccess = function (title, content) {
            service.title = title;
            service.content = content;
            service.color = "success";
            service.show = true;
            $timeout(service.hide, 2000);
        };

        service.hide = function () {
            service.show = false;
        };

    }

})();