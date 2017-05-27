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
            }).error(function (data) {
                console.log(data);
            });
        };

        // POST
        recruitmentEventFactory.postRecruitmentEvent = function (recruitmentEvent) {
            return $http.post(server + urlBase, recruitmentEvent).success(function (data) {
                recruitmentEventFactory.recruitmentEvents = angular.equals(recruitmentEventFactory.recruitmentEvents, []) ?
                    {} : recruitmentEventFactory.recruitmentEvents;
                recruitmentEventFactory.recruitmentEvents[data.recruitment_event.id] = data.recruitment_event;
            }).error(function (error) {
                console.log(error);
            });
        };

        // PUT
        recruitmentEventFactory.putRecruitmentEvent = function (recruitmentEvent) {
            return $http.post(server + urlBase + "/" + recruitmentEvent.id, recruitmentEvent).success(function (data) {
                recruitmentEventFactory.recruitmentEvents = angular.equals(recruitmentEventFactory.recruitmentEvents, []) ?
                    {} : recruitmentEventFactory.recruitmentEvents;
                recruitmentEventFactory.recruitmentEvents[data.recruitment_event.id] = data.recruitment_event;
            }).error(function (error) {
                console.log(error);
            });
        };

        // DELETE
        recruitmentEventFactory.deleteRecruitmentEvent = function (recruitmentEvent) {
            return $http.delete(server + urlBase + "/" + recruitmentEvent.id).success(function (data) {
                delete recruitmentEventFactory.recruitmentEvents[recruitmentEvent.id];
            }).error(function (error) {
                console.log(error);
            });
        };

        return recruitmentEventFactory;
    }
})();