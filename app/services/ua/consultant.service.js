(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ConsultantService', ConsultantService);

    ConsultantService.$inject = ['$http', 'SERVER_CONFIG'];

    function ConsultantService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/consultant';
        var consultantFactory = {};

        consultantFactory.getConsultant = function (id) {
            return $http.get(server + urlBase + '/' + id);
        };

        consultantFactory.getAllConsultants = function () {
            return $http.get(server + urlBase + 's');
        };

        consultantFactory.getAllConsultantsByProject = function (id, cache) {
            if (!cache) {
                delete consultantFactory.currentProjectConsultants;
            } else if (
                consultantFactory.currentProjectConsultants &&
                consultantFactory.currentProjectId == id
            ) {
                return;
            }
            return $http.get(server + urlBase + 's/project/' + id).success(function (data) {
                consultantFactory.currentProjectConsultants = data.consultants;
                consultantFactory.currentProjectId = id;
            }).error(function (data) {
                console.log(data);
            });
        };

        consultantFactory.getAllConsultantsByUser = function (id) {
            return $http.get(server + urlBase + 's/user/' + id);
        };

        // POST
        consultantFactory.postConsultant = function (id, consultant) {
            return $http.post(server + urlBase, consultant).success(function (data) {
                consultantFactory.currentProjectConsultants = angular.equals(consultantFactory.currentProjectConsultants, []) ?
                    {} : consultantFactory.currentProjectConsultants;
                consultantFactory.currentProjectConsultants[data.consultant.id] = data.consultant;
            }).error(function (error) {
                console.log(error);
            });
        };

        // DELETE
        consultantFactory.deleteConsultant = function (id) {
            return $http.delete(server + urlBase + "/" + id).success(function (data) {
                delete consultantFactory.currentProjectConsultants[id];
            }).error(function (error) {
                console.log(error);
            });
        };

        return consultantFactory;
    }

})();