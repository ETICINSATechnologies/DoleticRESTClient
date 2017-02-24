(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('KernelService', KernelService);

    KernelService.$inject = ['$http', 'SERVER_CONFIG'];

    function KernelService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/kernel/';
        var kernelFactory = {};

        kernelFactory.getUserRights = function (cache) {
            if (!cache) {
                delete kernelFactory.rightLevel;
            } else if (kernelFactory.rightLevel) {
                return;
            }
            return $http.get(server + urlBase + "rights").success(function (data) {
                kernelFactory.rightLevel = data.right;
            }).error(function (error) {
                console.log(error);
            });
        };

        return kernelFactory;
    }

})();