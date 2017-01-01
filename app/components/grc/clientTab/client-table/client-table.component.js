(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('grcClientTableComponent', grcClientTableComponent());

    function grcClientTableComponent() {
        return {
            bindings: {},
            controller: "grcClientTableController",
            templateUrl: "app/components/grc/clientTab/client-table/client-table.template.html"
        }
    }
})();