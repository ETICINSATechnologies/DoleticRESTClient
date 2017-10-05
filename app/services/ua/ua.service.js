(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('UAService', UAService);

    UAService.$inject = ['$http', 'SERVER_CONFIG', 'FileSaver'];

    function UAService($http, SERVER_CONFIG, FileSaver) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/';
        var uaFactory = {};

        uaFactory.getUserRights = function (cache) {
            if (!cache) {
                delete uaFactory.rightLevel;
            } else if (uaFactory.rightLevel) {
                return;
            }
            return $http.get(server + urlBase + "rights").success(function (data) {
                uaFactory.rightLevel = data.right;
            }).error(function (error) {
                console.log(error);
            });
        };

        uaFactory.publishProjectDocument = function (publishParams, label, number) {
            return $http({
                url: server + urlBase + 'publish/project',
                method: 'POST',
                responseType: 'arraybuffer',
                data: publishParams,
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                }
            }).success(function (data) {
                var blob = new Blob([data], {
                    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                });
                saveAs(blob, number + "-" + label + ".docx");
            }).error(function (error) {
                console.log(error);
            });
        };

        uaFactory.publishConsultantDocument = function (publishParams, label, number, consultantNumber) {
            return $http({
                url: server + urlBase + 'publish/consultant',
                method: 'POST',
                responseType: 'arraybuffer',
                data: publishParams,
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                }
            }).success(function (data) {
                var blob = new Blob([data], {
                    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                });
                saveAs(blob, number + "-" + label + consultantNumber +  ".docx");
            }).error(function (error) {
                console.log(error);
            });
        };

        uaFactory.publishDeliveryDocument = function (publishParams, label, number, deliveryNumber) {
            return $http({
                url: server + urlBase + 'publish/delivery',
                method: 'POST',
                responseType: 'arraybuffer',
                data: publishParams,
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                }
            }).success(function (data) {
                var blob = new Blob([data], {
                    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                });
                saveAs(blob, number + "-" + label + deliveryNumber +  ".docx");
            }).error(function (error) {
                console.log(error);
            });
        };

        return uaFactory;
    }

})();