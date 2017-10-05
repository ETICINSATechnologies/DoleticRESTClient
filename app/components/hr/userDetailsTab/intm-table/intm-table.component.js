(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('hrIntmTableComponent', hrIntmTableComponent());

    function hrIntmTableComponent() {
        return {
            bindings: {},
            controller: "hrIntmTableController",
            templateUrl: "app/components/hr/userDetailsTab/intm-table/intm-table.template.html"
        }
    }
})();