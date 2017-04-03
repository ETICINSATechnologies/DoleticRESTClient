(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('hrUserFormComponent', hrUserFormComponent());

    function hrUserFormComponent() {
        return {
            bindings: {},
            controller: "hrUserFormController",
            templateUrl: "app/components/hr/userTab/user-form/user-form.template.html"
        }
    }
})();