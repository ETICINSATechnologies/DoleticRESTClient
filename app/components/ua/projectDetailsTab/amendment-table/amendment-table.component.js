(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('grcActionTableComponent', grcActionTableComponent());

    function grcActionTableComponent() {
        return {
            bindings: {},
            controller: "grcActionTableController",
            templateUrl: "app/components/grc/contactDetailsTab/action-table/action-table.template.html"
        }
    }
})();