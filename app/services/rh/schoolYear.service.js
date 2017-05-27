(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('SchoolYearService', SchoolYearService);

    SchoolYearService.$inject = ['$http', 'SERVER_CONFIG'];

    function SchoolYearService($http, SERVER_CONFIG){
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/rh/year';
        var schoolYearFactory = {};

        schoolYearFactory.getAllSchoolYears = function (cache) {
            if (!cache) {
                delete schoolYearFactory.schoolYears;
            } else if (schoolYearFactory.schoolYears) {
                return;
            }
            return $http.get(server + urlBase + "s").success(function (data) {
                schoolYearFactory.years = data.years;
            }).error(function (data) {
                console.log(data);
            });
        };

        return schoolYearFactory;
    }
})();