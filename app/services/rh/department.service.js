(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('DepartmentService', DepartmentService);

    DepartmentService.$inject = ['$http', 'SERVER_CONFIG'];

    function DepartmentService($http, SERVER_CONFIG){
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/rh/department';
        var departmentFactory = {};

        departmentFactory.getAllDepartments = function (cache) {
            if (!cache) {
                delete departmentFactory.departments;
            } else if (departmentFactory.departments) {
                return;
            }
            return $http.get(server + urlBase + "s").success(function (data) {
                departmentFactory.departments = data.departments;
            }).error(function (data) {
                console.log(data);
            });
        };

        return departmentFactory;
    }
})();