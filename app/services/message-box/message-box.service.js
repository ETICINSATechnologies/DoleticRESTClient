(function () {
    'use strict';

    angular
        .module('doleticApp')
        .service('MessageBoxService', messageBoxService);

    messageBoxService.$inject = ['$timeout'];

    function messageBoxService($timeout) {

        var service = this;
        var serviceErrors = [
                'ERR_NO_ERROR',
                'ERR_MISSING_PARAMS',
                'ERR_MISSING_OBJ',
                'ERR_MISSING_ACT',
                'ERR_MISSING_SERVICE',
                'ERR_SERVICE_FAILED',
                'ERR_INSUFFICIENT_RIGHTS'
            ];

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

        service.handleServiceError = function (data) {
            if (data.code != 0) {
                if (data.code < serviceErrors.length) {
                    var html = "<ul><li>Erreur : " + serviceErrors[data.code] + "</li>";
                    if (data.code == 5) {
                        html += "<li>Détails : " + data.error + "</li>";
                    }
                    html += "</ul>";
                    showError("Le service a renvoyé une erreur !", html);
                } else {
                    showError("Le service a renvoyé une erreur !","<p>Une erreur inconnue s'est produite lors de l'appel au service. Merci de prévenir les développeurs.</p>");
                }
            }
        }

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