(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('hrPositionTableComponent', hrPositionTableComponent());

    function hrPositionTableComponent() {
        return {
            bindings: {},
            controller: "hrPositionTableController",
            templateUrl: "app/components/hr/userDetailsTab/position-table/position-table.template.html"
        }
    }
})();