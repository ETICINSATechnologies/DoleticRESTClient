(function () {
    'use strict';

    angular
        .module('doleticApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
           .state('stdDoc.docTab', {
            parent: 'stdDoc',
            url: "/docTab",
            templateUrl: "app/components/stdDoc/docTab/stdDoc-docTab.template.html",
            controller: "stdDocDocTabController",
            activetab: 'doc'
        }).state('stdDoc.oldDocTab', {
            parent: 'stdDoc',
            url: "/deprecatedDocTab",
            templateUrl: "app/components/stdDoc/deprecatedDocTab/stdDoc-deprecatedDocTab.template.html",
            controller: "stdDocOldDocTabController",
            activetab: 'oldDoc'
        }).state('stdDoc.userDetailsTab', {
            parent: 'stdDoc',
            url: "/docDetailsTab/{id:int}",
            templateUrl: "app/components/stdDoc/docDetailsTab/stdDoc-docDetailsTab.template.html",
            controller: "stdDocUserDetailsTabController",
            activetab: 'docDetails'
        });
    }
})();