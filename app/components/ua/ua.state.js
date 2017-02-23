(function () {
    'use strict';

    angular
        .module('doleticApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('ua.statsTab', {
                parent: 'ua',
                url: "/statsTab",
                templateUrl: "app/components/ua/statsTab/ua-statsTab.template.html",
                controller: "uaStatsTabController",
                activetab: 'stats'
            }).state('ua.unsignedTab', {
            parent: 'ua',
            url: "/unsignedTab",
            templateUrl: "app/components/ua/unsignedTab/ua-unsignedTab.template.html",
            controller: "uaUnsignedTabController",
            activetab: 'unsigned'
        }).state('ua.currentTab', {
            parent: 'ua',
            url: "/currentTab",
            templateUrl: "app/components/ua/currentTab/ua-currentTab.template.html",
            controller: "uaCurrentTabController",
            activetab: 'current'
        }).state('ua.archivedTab', {
            parent: 'ua',
            url: "/archivedTab",
            templateUrl: "app/components/ua/archivedTab/ua-archivedTab.template.html",
            controller: "uaArchivedTabController",
            activetab: 'archived'
        }).state('ua.disabledTab', {
            parent: 'ua',
            url: "/disabledTab",
            templateUrl: "app/components/ua/disabledTab/ua-disabledTab.template.html",
            controller: "uaDisabledTabController",
            activetab: 'disabled'
       }).state('ua.projectDetailsTab', {
            parent: 'ua',
            url: "/projectDetailsTab/{id:int}",
            templateUrl: "app/components/ua/projectDetailsTab/ua-projectDetailsTab.template.html",
            controller: "uaProjectDetailsTabController",
            activetab: 'projectDetails'
        });
    }
})();