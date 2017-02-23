(function () {
    'use strict';

    angular
        .module('doleticApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('support.ticketTab', {
                parent: 'support',
                url: "/ticketTab",
                templateUrl: "app/components/support/ticketTab/support-ticketTab.template.html",
                controller: "supportTicketTabController",
                activetab: 'ticket'
            }).state('support.adminTab', {
            parent: 'support',
            url: "/adminTab",
            templateUrl: "app/components/support/adminTab/support-adminTab.template.html",
            controller: "supportAdminTabController",
            activetab: 'admin'
        });
    }
})();