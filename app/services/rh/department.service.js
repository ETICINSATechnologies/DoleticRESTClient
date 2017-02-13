(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('DepartmentService', DepartmentService);

    DepartmentService.$inject = ['$http', 'SERVER_CONFIG'];

    function DepartmentService($http, SERVER_CONFIG){
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/rh/department';
        var projectFactory = {departments : {}};

        projectFactory.getAllDepartments = function (cache) {
            return $http.get(server + urlBase + "s", { cache: cache}).success(function (data) {
                projectFactory.departments = data.departments;
            }).error(function (data) {
                console.log(data);
            });
        };

        return projectFactory;
    }
});