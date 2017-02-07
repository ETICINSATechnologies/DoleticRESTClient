(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('GenderService', GenderService);

    GenderService.$inject = ['$http', 'SERVER_CONFIG'];

    function GenderService($http, SERVER_CONFIG){
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/kernel/gender';
        var projectFactory = {};

        projectFactory.getAllGenders = function () {
            return $http.get(server + urlBase + "s", {cache :true});
        };

        return projectFactory;
    }
});