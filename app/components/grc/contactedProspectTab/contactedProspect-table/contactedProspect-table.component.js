(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('grcContactedProspectTableComponent', grcContactedProspectTableComponent());

    function grcContactedProspectTableComponent() {
        return {
            bindings: {},
            controller: "grcContactedProspectTableController",
            templateUrl: "app/components/grc/contactedProspectTab/contactedProspect-table/contactedProspect-table.template.html"
        }
    }
})();