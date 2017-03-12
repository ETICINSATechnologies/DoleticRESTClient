(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('TicketService', TicketService);

    TicketService.$inject = ['$http', 'SERVER_CONFIG'];

    function TicketService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/support/ticket';
        var ticketFactory = {};

        ticketFactory.postTicket = function (ticket) {
            return $http.post(server + urlBase, ticket).success(function (data) {
                ticketFactory.tickets = angular.equals(ticketFactory.tickets, []) ?
                {} : ticketFactory.tickets;
                ticketFactory.tickets[data.ticket.id] = data.ticket;
            }).error(function (error) {
                console.log(error);
            });
        };

        ticketFactory.putTicket = function (ticket) {
            return $http.post(server + urlBase + "/" + ticket.id, ticket).success(function (data) {
                ticketFactory.tickets[data.ticket.id] = data.ticket;
            }).error(function (error) {
                console.log(error);
            });
        };
        
        ticketFactory.deleteTicket = function (id) {
            return $http.delete(server + urlBase + "/" + id).success(function (data) {
                delete ticketFactory.tickets[id];
            }).error(function (error) {
                console.log(error);
            });
        };

        ticketFactory.getTicket = function (id) {
            return $http.get(server + urlBase + id);
        };

        ticketFactory.getAllTickets = function (cache) {
            if (!cache) {
                delete ticketFactory.tickets;
            } else if (ticketFactory.tickets) {
                return;
            }
            return $http.get(server + urlBase + "s").success(function (data) {
                ticketFactory.tickets = data.tickets;
            }).error(function (error) {
                console.log(error);
            });
        };

        ticketFactory.getAllTicketsByCurrent = function () {
            return $http.get(server + urlBase + 's/current');
        };
        ticketFactory.getAllTicketsByType = function (id) {
            return $http.get(server + urlBase + 's/type/' + id);
        };

        ticketFactory.getAllTicketsByAuthorId = function (id) {
            return $http.get(server + urlBase + "s/author/" + id);
        };

        ticketFactory.getAllTicketsByStatusId = function (id) {
            return $http.get(server + urlBase + "s/status/" + id);
        };

        return ticketFactory;
    }

})();