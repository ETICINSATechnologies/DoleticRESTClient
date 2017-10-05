(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('hrDisabledTableComponent', hrDisabledTableComponent());

    function hrDisabledTableComponent() {
        return {
            bindings: {},
            controller: "hrDisabledTableController",
            templateUrl: "app/components/hr/disabledMembersTab/disabled-table/disabled-table.template.html"
        }
    }
})();