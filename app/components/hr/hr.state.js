(function () {
    'use strict';

    angular
        .module('doleticApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('hr.statsTab', {
                parent: 'hr',
                url: "/statsTab",
                templateUrl: "app/components/hr/statsTab/hr-statsTab.template.html",
                controller: "hrStatsTabController",
                activetab: 'stats'
            }).state('hr.membersTab', {
            parent: 'hr',
            url: "/membersTab",
            templateUrl: "app/components/hr/membersTab/hr-membersTab.template.html",
            controller: "hrMembersTabController",
            activetab: 'members'
        }).state('hr.oldMembersTab', {
            parent: 'hr',
            url: "/oldMembersTab",
            templateUrl: "app/components/hr/oldMembersTab/hr-oldMembersTab.template.html",
            controller: "hrOldMembersTabController",
            activetab: 'oldMembers'
        }).state('hr.disabledMembersTab', {
            parent: 'hr',
            url: "/disabledMembersTab",
            templateUrl: "app/components/hr/disabledMembersTab/hr-disabledTab.template.html",
            controller: "hrDisabledMembersTabController",
            activetab: 'disabledMembers'
        }).state('hr.teamsTab', {
            parent: 'hr',
            url: "/teamsTab",
            templateUrl: "app/components/hr/teamsTab/hr-teamsTab.template.html",
            controller: "hrTeamsTabController",
            activetab: 'teams'
        }).state('hr.userDetailsTab', {
            parent: 'hr',
            url: "/docDetailsTab/{id:int}",
            templateUrl: "app/components/hr/userDetailsTab/hr-userDetailsTab.template.html",
            controller: "hrUserDetailsTabController",
            activetab: 'userDetails'
        });
    }
})();