(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('RecruitmentEventService', RecruitmentEventService);

    RecruitmentEventService.$inject = ['$http', 'SERVER_CONFIG'];

    function RecruitmentEventService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/rh/recruitment_event';
        var recruitmentEventFactory = {};

        recruitmentEventFactory.getAllRecruitmentEvents = function (cache) {
            if (!cache) {
                delete recruitmentEventFactory.recruitmentEvents;
            } else if (recruitmentEventFactory.recruitmentEvents) {
                return;
            }
            return $http.get(server + urlBase + "s").success(function (data) {
                recruitmentEventFactory.recruitmentEvents = data.recruitmentEvents;
            }).error(function (data) {
                console.log(data);
            });
        };

        return recruitmentEventFactory;
    }
})();