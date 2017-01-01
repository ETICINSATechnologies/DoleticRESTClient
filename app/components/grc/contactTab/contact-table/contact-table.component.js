(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('grcContactTableComponent', grcContactTableComponent());

    function grcContactTableComponent() {
        return {
            bindings: {},
            controller: "grcContactTableController",
            templateUrl: "app/components/grc/contactTab/contact-table/contact-table.template.html"
        }
    }
})();