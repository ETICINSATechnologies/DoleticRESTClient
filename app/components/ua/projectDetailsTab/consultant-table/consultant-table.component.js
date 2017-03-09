(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaConsultantTableComponent', uaConsultantTableComponent());

    function uaConsultantTableComponent() {
        return {
            bindings: {},
            controller: "uaConsultantTableController",
            templateUrl: "app/components/ua/projectDetailsTab/consultant-table/consultant-table.template.html"
        }
    }
})();