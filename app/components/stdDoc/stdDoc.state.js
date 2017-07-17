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
            activetab: 'documentsType'
        });
    }
})();