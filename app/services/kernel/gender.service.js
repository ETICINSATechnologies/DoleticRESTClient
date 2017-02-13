(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('GenderService', GenderService);

    GenderService.$inject = ['$http', 'SERVER_CONFIG'];

    function GenderService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/kernel/gender';
        var genderFactory = {};

        genderFactory.getAllGenders = function (cache) {
            if (!cache) {
                delete genderFactory.genders;
            } else if (genderFactory.genders) {
                return;
            }
            return $http.get(server + urlBase + "s").success(function (data) {
                genderFactory.genders = data.genders;
            }).error(function (data) {
                console.log(data);
            });
        };

        return genderFactory;
    }

})();