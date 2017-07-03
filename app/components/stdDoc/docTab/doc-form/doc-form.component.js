(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('hrUserFormComponent', hrUserFormComponent());

    function hrUserFormComponent() {
        return {
            bindings: {},
            controller: "hrUserFormController",
            templateUrl: "app/components/hr/userTab/doc-form/doc-form.template.html"
        }
    }
})();