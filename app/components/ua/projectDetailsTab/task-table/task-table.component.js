(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaTaskTableComponent', uaTaskTableComponent());

    function uaTaskTableComponent() {
        return {
            bindings: {},
            controller: "uaTaskTableController",
            templateUrl: "app/components/ua/projectDetailsTab/task-table/task-table.template.html"
        }
    }
})();