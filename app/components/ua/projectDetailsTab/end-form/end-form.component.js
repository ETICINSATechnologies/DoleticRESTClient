(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaEndFormComponent', uaEndFormComponent());

    function uaEndFormComponent() {
        return {
            bindings: {},
            controller: "uaEndFormController",
            templateUrl: "app/components/ua/contactDetailsTab/end-form/end-form.template.html"
        }
    }
})();