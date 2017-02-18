(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('FirmService', FirmService);

    FirmService.$inject = ['$http', 'SERVER_CONFIG'];

    function FirmService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/grc/firm';
        var firmFactory = {};

        firmFactory.getAllFirms = function (cache) {
            if (!cache) {
                delete firmFactory.firms;
            } else if (firmFactory.firms) {
                return;
            }
            return $http.get(server + urlBase + "s").success(function (data) {
                firmFactory.firms = data.firms;
            }).error(function (error) {
                console.log(error);
            });
        };

        firmFactory.postFirm = function (firm) {
            return $http.post(server + urlBase, firm).success(function (data) {
                firmFactory.firm = angular.equals(firmFactory.firm, []) ?
                    {} : firmFactory.firm;
                firmFactory.firms[data.firm.id] = data.firm;
            }).error(function (error) {
                console.log(error);
            });
        };

        firmFactory.putFirm = function (firm) {
            return $http.post(server + urlBase + "/" + firm.id, firm).success(function (data) {
                firmFactory.firms[data.firm.id] = data.firm;
            }).error(function (error) {
                console.log(error);
            });
        };

        firmFactory.deleteFirm = function (id) {
            return $http.delete(server + urlBase + "/" + id).success(function (data) {
                delete firmFactory.firms[id];
            }).error(function (error) {
                console.log(error);
            });
        };

        return firmFactory;
    }

})();