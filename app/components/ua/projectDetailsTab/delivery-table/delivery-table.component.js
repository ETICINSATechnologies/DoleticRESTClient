(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaDeliveryTableComponent', uaDeliveryTableComponent());

    function uaDeliveryTableComponent() {
        return {
            bindings: {},
            controller: "uaDeliveryTableController",
            templateUrl: "app/components/ua/projectDetailsTab/delivery-table/delivery-table.template.html"
        }
    }
})();