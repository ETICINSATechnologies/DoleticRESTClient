(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaDeliverFormComponent', uaDeliverFormComponent());

    function uaDeliverFormComponent() {
        return {
            bindings: {},
            controller: "uaDeliverFormController",
            templateUrl: "app/components/ua/contactDetailsTab/delivery-table/deliver-form/deliver-form.template.html"
        }
    }
})();