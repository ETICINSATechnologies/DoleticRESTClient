(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('TeamService', TeamService);

    TeamService.$inject = ['$http', 'SERVER_CONFIG'];

    function TeamService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/rh/team';
        var teamFactory = {teams: {}};

        teamFactory.getAllTeams = function (cache) {
            if (!cache) {
                delete teamFactory.teams;
            } else if (teamFactory.teams) {
                return;
            }
            return $http.get(server + urlBase, {cache: cache}).success(function (data) {
                teamFactory.teams = data.teams;
            }).error(function (data) {
                console.log(data);
            });
        };

        return teamFactory;
    }
})();