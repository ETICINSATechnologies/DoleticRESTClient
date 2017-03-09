(function () {
    'use strict';

    angular
        .module('doleticApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('tools.signatureTab', {
                parent: 'tools',
                url: "/signatureTab",
                templateUrl: "app/components/tools/signatureTab/tools-signatureTab.template.html",
                controller: "toolsSignatureTabController",
                activetab: 'signature'
            }).state('tools.mailingTab', {
            parent: 'tools',
            url: "/mailingTab",
            templateUrl: "app/components/tools/mailingTab/tools-mailingTab.template.html",
            controller: "toolsMailingTabController",
            activetab: 'mailing'
        }).state('tools.indicatorTab', {
            parent: 'tools',
            url: "/indicatorTab",
            templateUrl: "app/components/tools/indicatorTab/tools-indicatorTab.template.html",
            controller: "toolsIndicatorTabController",
            activetab: 'indicator'
        });
    }
})();