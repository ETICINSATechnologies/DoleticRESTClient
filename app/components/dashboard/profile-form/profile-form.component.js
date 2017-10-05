(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('profileFormComponent', profileFormComponent());

    function profileFormComponent() {
        return {
            bindings: {},
            controller: "ProfileFormController",
            templateUrl: "app/components/dashboard/profile-form/profile-form.template.html"
        }
    }
})();