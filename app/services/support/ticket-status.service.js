(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('TicketStatusService', TicketStatusService);

    TicketStatusService.$inject = ['$http', 'SERVER_CONFIG'];

    function TicketStatusService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/support/ticket_status';
        var ticketStatusFactory = {};

        ticketStatusFactory.getTicketStatus = function (id) {
            return $http.get(server + urlBase + "/"+ id);
        };

        ticketStatusFactory.getAllTicketStatuses = function (cache) {
            if (!cache) {
                delete ticketStatusFactory.ticketStatuses;
            } else if (ticketStatusFactory.ticketStatuses) {
                return;
            }
            return $http.get(server + urlBase + "s").success(function (data) {
                ticketStatusFactory.ticketStatuses = data.ticketStatuses;
            }).error(function (error) {
                console.log(error);
            });
        };

        ticketStatusFactory.postTicketStatus = function (ticketStatus) {
            return $http.post(server + urlBase, ticketStatus).success(function (data) {
                ticketStatusFactory.ticketStatuses = angular.equals(ticketStatusFactory.ticketStatuses, []) ?
                {} : ticketStatusFactory.ticketStatuses;
                ticketStatusFactory.ticketStatuses[data.ticketStatus.id] = data.ticketStatus;
            }).error(function (error) {
                console.log(error);
            });
        };

        ticketStatusFactory.putTicketStatus = function (ticketStatus) {
            return $http.post(server + urlBase + "/" + ticketStatus.id, ticketStatus).success(function (data) {
                ticketStatusFactory.ticketStatuses[data.ticketStatus.id] = data.ticketStatus;
            }).error(function (error) {
                console.log(error);
            });
        };

        ticketStatusFactory.deleteTicketStatus = function (id) {
            return $http.delete(server + urlBase + "/" + id).success(function (data) {
                delete ticketStatusFactory.ticketStatuses[id];
            }).error(function (error) {
                console.log(error);
            });
        };

        ticketStatusFactory.getTicketStatusByLabel = function (id) {
            return $http.get(server + urlBase + id);
        };

        return ticketStatusFactory;
    }

})();