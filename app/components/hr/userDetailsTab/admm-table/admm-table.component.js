(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('hrAdmmTableComponent', hrAdmmTableComponent());

    function hrAdmmTableComponent() {
        return {
            bindings: {},
            controller: "hrAdmmTableController",
            templateUrl: "app/components/hr/userDetailsTab/admm-table/admm-table.template.html"
        }
    }
})();