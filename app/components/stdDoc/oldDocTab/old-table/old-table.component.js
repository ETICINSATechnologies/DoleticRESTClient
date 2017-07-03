(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('hrOldTableComponent', hrOldTableComponent());

    function hrOldTableComponent() {
        return {
            bindings: {},
            controller: "hrOldTableController",
            templateUrl: "app/components/hr/oldDocTab/old-table/old-table.template.html"
        }
    }
})();