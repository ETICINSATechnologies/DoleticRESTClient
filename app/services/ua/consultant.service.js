(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ConsultantService', ConsultantService);

    ConsultantService.$inject = ['$http', 'SERVER_CONFIG'];

    function ConsultantService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/consultant';
        var consultantService = {};

        consultantService.getConsultant = function (id) {
            return $http.get(server + urlBase + '/' + id);
        };

        consultantService.getAllConsultants = function () {
            return $http.get(server + urlBase + 's');
        };

        consultantService.getAllConsultantsByProject = function (id) {
            return $http.get(server + urlBase + 's/project/' + id);
        };

        consultantService.getAllConsultantsByUser = function (id) {
            return $http.get(server + urlBase + 's/user/' + id);
        };

        return consultantService;
    }

})();