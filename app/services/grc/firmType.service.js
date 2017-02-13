(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('FirmTypeService', FirmTypeService);

    FirmTypeService.$inject = ['$http', 'SERVER_CONFIG'];

    function FirmTypeService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/grc/firm_type';
        var firmTypeFactory = {firmTypes: {}};

        firmTypeFactory.getAllFirmTypes = function (cache) {
            return $http.get(server + urlBase + "s", {cache: cache}).success(function (data) {
                firmTypeFactory.firmTypes = data.firm_types;
            }).error(function (data) {
                console.log(data);
            });
        };

        return firmTypeFactory;
    }

})();