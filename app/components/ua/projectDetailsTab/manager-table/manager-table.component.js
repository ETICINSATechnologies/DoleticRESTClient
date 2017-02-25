(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaManagerTableComponent', uaManagerTableComponent());

    function uaManagerTableComponent() {
        return {
            bindings: {},
            controller: "uaManagerTableController",
            templateUrl: "app/components/ua/projectDetailsTab/manager-table/manager-table.template.html"
        }
    }
})();