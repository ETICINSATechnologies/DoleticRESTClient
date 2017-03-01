(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaContactTableComponent', uaContactTableComponent());

    function uaContactTableComponent() {
        return {
            bindings: {},
            controller: "uaContactTableController",
            templateUrl: "app/components/ua/projectDetailsTab/contact-table/contact-table.template.html"
        }
    }
})();