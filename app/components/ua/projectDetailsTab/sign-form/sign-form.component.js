(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaSignFormComponent', uaSignFormComponent());

    function uaSignFormComponent() {
        return {
            bindings: {},
            controller: "uaSignFormController",
            templateUrl: "app/components/ua/contactDetailsTab/sign-form/sign-form.template.html"
        }
    }
})();