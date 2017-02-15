(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('FirmTypeService', FirmTypeService);

    FirmTypeService.$inject = ['$http', 'SERVER_CONFIG'];

    function FirmTypeService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/grc/firm_type';
        var firmTypeFactory = {};

        firmTypeFactory.getAllFirmTypes = function (cache) {
            if (!cache) {
                delete firmTypeFactory.firmTypes;
            } else if (firmTypeFactory.firmTypes) {
                return;
            }
            return $http.get(server + urlBase + "s").success(function (data) {
                firmTypeFactory.firmTypes = data.firm_types;
            }).error(function (data) {
                console.log(data);
            });
        };

        return firmTypeFactory;
    }

})();