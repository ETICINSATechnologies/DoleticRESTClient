(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('grcClientFormComponent', grcClientFormComponent());

    function grcClientFormComponent() {
        return {
            bindings: {},
            controller: "grcActionFormController",
            templateUrl: "app/components/grc/contactDetailsTab/action-form/action-form.template.html"
        }
    }
})();