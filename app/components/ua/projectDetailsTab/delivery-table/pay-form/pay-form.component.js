(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaPayFormComponent', uaPayFormComponent());

    function uaPayFormComponent() {
        return {
            bindings: {},
            controller: "uaPayFormController",
            templateUrl: "app/components/ua/contactDetailsTab/delivery-table/pay-form/pay-form.template.html"
        }
    }
})();