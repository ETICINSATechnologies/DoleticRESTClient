(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('grcOldClientTableComponent', grcOldClientTableComponent());

    function grcOldClientTableComponent() {
        return {
            bindings: {},
            controller: "grcOldClientTableController",
            templateUrl: "app/components/grc/oldClientTab/oldClient-table/oldClient-table.template.html"
        }
    }
})();