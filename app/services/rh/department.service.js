(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('DepartmentService', DepartmentService);

    DepartmentService.$inject = ['$http', 'SERVER_CONFIG'];

    function DepartmentService($http, SERVER_CONFIG){
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/rh/department';
        var projectFactory = {};

        projectFactory.getAllDepartments = function () {
            return $http.get(server + urlBase + "s", {cache :true});
        };

        return projectFactory;
    }
});