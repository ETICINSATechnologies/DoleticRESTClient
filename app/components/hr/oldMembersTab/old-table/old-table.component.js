(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('hrOldTableComponent', hrOldTableComponent());

    function hrOldTableComponent() {
        return {
            bindings: {},
            controller: "hrOldTableController",
            templateUrl: "app/components/hr/oldMembersTab/old-table/old-table.template.html"
        }
    }
})();