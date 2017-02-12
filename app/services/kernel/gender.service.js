(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('GenderService', GenderService);

    GenderService.$inject = ['$http', 'SERVER_CONFIG'];

    function GenderService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/kernel/gender';
        var genderFactory = {genders: {}};

        genderFactory.getAllGenders = function (cache) {
            return $http.get(server + urlBase + "s", {cache: cache}).success(function (data) {
                genderFactory.genders = data.genders;
            }).error(function (data) {
                console.log(data);
            });
        };

        return genderFactory;
    }

})();