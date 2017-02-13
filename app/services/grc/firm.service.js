(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('FirmService', FirmService);

    FirmService.$inject = ['$http', 'SERVER_CONFIG'];

    function FirmService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/grc/firm';
        var firmFactory = {firms: {}};

        firmFactory.getAllFirms = function (cache) {
            return $http.get(server + urlBase + "s", {cache: cache}).success(function (data) {
                firmFactory.firms = data.firms;
            }).error(function () {
                console.log(data);
            });
        };

        firmFactory.postFirm = function (firm) {
            return $http.post(server + urlBase, firm).success(function (data) {
                firmFactory.firms[data.firm.id] = data.firm;
            }).error(function (data) {
                console.log(error);
            });
        };

        firmFactory.putFirm = function (firm) {
            return $http.post(server + urlBase + "/" + firm.id, firm).success(function (data) {
                firmFactory.firms[firm.id] = data.firm;
            }).error(function (data) {
                console.log(error);
            });
        };

        firmFactory.deleteFirm = function (id) {
            return $http.delete(server + urlBase + "/" + id).success(function (data) {
                delete firmFactory.firms[id];
            }).error(function (data) {
                console.log(data);
            });
        };

        return firmFactory;
    }

})();