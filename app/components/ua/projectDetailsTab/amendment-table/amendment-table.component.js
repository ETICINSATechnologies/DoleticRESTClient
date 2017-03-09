(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaAmendmentTableComponent', uaAmendmentTableComponent());

    function uaAmendmentTableComponent() {
        return {
            bindings: {},
            controller: "uaAmendmentTableController",
            templateUrl: "app/components/ua/projectDetailsTab/amendment-table/amendment-table.template.html"
        }
    }
})();