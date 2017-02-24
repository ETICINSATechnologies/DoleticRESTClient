(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaCurrentTableComponent', uaCurrentTableComponent());

    function uaCurrentTableComponent() {
        return {
            bindings: {},
            controller: "uaCurrentTableController",
            templateUrl: "app/components/ua/currentTab/current-table/current-table.template.html"
        }
    }
})();