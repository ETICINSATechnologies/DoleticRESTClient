(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('contactTableComponent', contactTableComponent());

    function contactTableComponent() {
        return {
            bindings: {},
            controller: "ContactTableController",
            templateUrl: "app/components/dashboard/contact-table/contact-table.template.html"
        }
    }
})();