(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaAuditorTableComponent', uaAuditorTableComponent());

    function uaAuditorTableComponent() {
        return {
            bindings: {},
            controller: "uaAuditorTableController",
            templateUrl: "app/components/ua/projectDetailsTab/auditor-table/auditor-table.template.html"
        }
    }
})();