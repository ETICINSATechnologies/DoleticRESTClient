(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaSendDateFormComponent', uaSendDateFormComponent());

    function uaSendDateFormComponent() {
        return {
            bindings: {},
            controller: "uaSendDateFormController",
            templateUrl: "app/components/ua/contactDetailsTab/sendDate-form/sendDate-form.template.html"
        }
    }
})();