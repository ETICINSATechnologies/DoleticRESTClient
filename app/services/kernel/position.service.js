(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('PositionService', PositionService);

    PositionService.$inject = ['$http', 'SERVER_CONFIG'];

    function PositionService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/kernel/position';
        var positionFactory = {};

        positionFactory.getAllPositions = function (cache) {
            if (!cache) {
                delete positionFactory.positions;
            } else if (positionFactory.positions) {
                return;
            }
            return $http.get(server + urlBase + "s").success(function (data) {
                positionFactory.positions = data.positions;
            }).error(function (data) {
                console.log(data);
            });
        };

        return positionFactory;
    }

})();