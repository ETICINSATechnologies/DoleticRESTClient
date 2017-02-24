(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('ProfileFormComponent', ProfileFormComponent());

    function ProfileFormComponent() {
        return {
            bindings: {},
            controller: "ProfileFormController",
            templateUrl: "app/components/dashboard/profile-form-modal/profile-form-modal.template.html"
        }
    }
})();