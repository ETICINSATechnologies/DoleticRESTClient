(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('grcProspectTableComponent', grcProspectTableComponent());

    function grcProspectTableComponent() {
        return {
            bindings: {},
            controller: "grcProspectTableController",
            templateUrl: "app/components/grc/prospectTab/prospect-table/prospect-table.template.html"
        }
    }
})();