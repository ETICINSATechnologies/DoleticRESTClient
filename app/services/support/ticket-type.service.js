(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('TicketTypeService', TicketTypeService);

    TicketTypeService.$inject = ['$http', 'SERVER_CONFIG'];

    function TicketTypeService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/support/ticket_type';
        var ticketTypeFactory = {};

        ticketTypeFactory.getTicketType = function (id) {
            return $http.get(server + urlBase + "/"+ id);
        };

        ticketTypeFactory.getAllTicketTypes = function (cache) {
            if (!cache) {
                delete ticketTypeFactory.ticketTypes;
            } else if (ticketTypeFactory.ticketTypes) {
                return;
            }
            return $http.get(server + urlBase + "s").success(function (data) {
                ticketTypeFactory.ticketTypes = data.ticketTypes;
            }).error(function (error) {
                console.log(error);
            });
        };

        ticketTypeFactory.postTicketType = function (ticketType) {
            return $http.post(server + urlBase, tickettype).success(function (data) {
                ticketTypeFactory.ticketTypees = angular.equals(ticketTypeFactory.ticketTypes, []) ?
                {} : ticketTypeFactory.ticketTypes;
                ticketTypeFactory.ticketTypes[data.ticketType.id] = data.ticketType;
            }).error(function (error) {
                console.log(error);
            });
        };

        ticketTypeFactory.putTicketType = function (ticketType) {
            return $http.post(server + urlBase + "/" + ticketType.id, ticketType).success(function (data) {
                ticketTypeFactory.ticketTypes[data.ticketType.id] = data.ticketType;
            }).error(function (error) {
                console.log(error);
            });
        };

        ticketTypeFactory.deleteTicketType = function (id) {
            return $http.delete(server + urlBase + "/" + id).success(function (data) {
                delete ticketTypeFactory.ticketTypes[id];
            }).error(function (error) {
                console.log(error);
            });
        };

        ticketTypeFactory.getTicketTypeByLabel = function (id) {
            return $http.get(server + urlBase + id);
        };

        return ticketTypeFactory;
    }

})();