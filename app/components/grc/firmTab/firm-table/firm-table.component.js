(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('grcFirmTableComponent', grcFirmTableComponent());

    function grcFirmTableComponent() {
        return {
            bindings: {},
            controller: "grcFirmTableController",
            templateUrl: "app/components/grc/firmTab/firm-table/firm-table.template.html"
        }
    }
})();