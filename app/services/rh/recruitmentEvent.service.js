(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('RecruitmentEventService', RecruitmentEventService);

    RecruitmentEventService.$inject = ['$http', 'SERVER_CONFIG', '$filter'];

    function RecruitmentEventService($http, SERVER_CONFIG, $filter) {
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
                recruitmentEventFactory.recruitmentEvents = data.recruitment_events;
                for (var id in recruitmentEventFactory.recruitmentEvents) {
                    recruitmentEventFactory.recruitmentEvents[id].date = $filter('date')(recruitmentEventFactory.recruitmentEvents[id].date, "dd/MM/y");
                }
            }).error(function (data) {
                console.log(data);
            });
        };

        return recruitmentEventFactory;
    }
})();