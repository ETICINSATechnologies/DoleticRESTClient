(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('grcActionFormComponent', grcActionFormComponent());

    function grcActionFormComponent() {
        return {
            bindings: {},
            controller: "grcActionFormController",
            templateUrl: "app/components/grc/contactDetailsTab/action-form/action-form.template.html"
        }
    }
})();