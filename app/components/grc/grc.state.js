(function() {
    'use strict';

    angular
        .module('doleticApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('grc.statsTab', {
                parent: 'grc',
                url: "/statsTab",
                templateUrl: "app/components/grc/statsTab/grc-statsTab.template.html",
                controller: "grcStatsTabController",
                activetab: 'stats'
            }).state('grc.prospectTab', {
                parent: 'grc',
                url: "/prospectTab",
                templateUrl: "app/components/grc/prospectTab/grc-prospectTab.template.html",
                controller: "grcProspectTabController",
                activetab: 'prospect'
            }).state('grc.firmTab', {
                parent: 'grc',
                url: "/firmTab",
                templateUrl: "app/components/grc/firmTab/grc-firmTab.template.html",
                controller: "grcFirmTabController",
                activetab: 'firm'
            }).state('grc.contactTab', {
                parent: 'grc',
                url: "/contactTab",
                templateUrl: "app/components/grc/contactTab/grc-contactTab.template.html",
                controller: "grcContactTabController",
                activetab: 'contact'
            }).state('grc.clientTab', {
                parent: 'grc',
                url: "/clientTab",
                templateUrl: "app/components/grc/clientTab/grc-clientTab.template.html",
                controller: "grcClientTabController",
                activetab: 'client'
            }).state('grc.oldClientTab', {
                parent: 'grc',
                url: "/oldClientTab",
                templateUrl: "app/components/grc/oldClientTab/grc-oldClientTab.template.html",
                controller: "grcOldClientTabController",
                activetab: 'old'
            }).state('grc.contactDetailsTab', {
                parent: 'grc',
                url: "/contactDetailsTab",
                templateUrl: "app/components/grc/contactDetailsTab/grc-contactDetailsTab.template.html",
                controller: "grcContactDetailsTabController",
                activetab: 'contactDetails'
            });
    }
})();