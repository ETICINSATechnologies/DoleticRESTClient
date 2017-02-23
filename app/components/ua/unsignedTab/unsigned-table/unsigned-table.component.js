(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaUnsignedTableComponent', uaUnsignedTableComponent());

    function uaUnsignedTableComponent() {
        return {
            bindings: {},
            controller: "uaUnsignedTableController",
            templateUrl: "app/components/ua/unsignedTab/unsigned-table/unsigned-table.template.html"
        }
    }
})();