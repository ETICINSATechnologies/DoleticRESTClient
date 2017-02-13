(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('grcClientFormComponent', grcClientFormComponent());

    function grcClientFormComponent() {
        return {
            bindings: {},
            controller: "grcClientFormController",
            templateUrl: "app/components/grc/clientTab/client-form/client-form.template.html"
        }
    }
})();