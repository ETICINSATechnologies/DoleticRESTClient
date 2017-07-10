(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('hrUserTableComponent', hrUserTableComponent());

    function hrUserTableComponent() {
        return {
            bindings: {},
            controller: "hrUserTableController",
            templateUrl: "app/components/hr/docTab/doc-table/doc-table.template.html"
        }
    }
})();