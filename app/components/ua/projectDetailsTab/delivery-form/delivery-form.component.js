(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaDeliveryFormComponent', uaDeliveryFormComponent());

    function uaDeliveryFormComponent() {
        return {
            bindings: {},
            controller: "uaDeliveryFormController",
            templateUrl: "app/components/ua/contactDetailsTab/delivery-form/delivery-form.template.html"
        }
    }
})();