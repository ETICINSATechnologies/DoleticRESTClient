(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('hrDisabledUserTableComponent', hrDisabledUserTableComponent());

    function hrDisabledUserTableComponent() {
        return {
            bindings: {},
            controller: "hrDisabledUserTableController",
            templateUrl: "app/components/hr/disabledMembersTab/disabled-table/disabled-table.template.html"
        }
    }
})();