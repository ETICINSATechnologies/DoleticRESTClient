(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('PassFormComponent', PassFormComponent());

    function PassFormComponent() {
        return {
            bindings: {},
            controller: "PassFormController",
            templateUrl: "app/components/dashboard/pass-form-modal/pass-form-modal.template.html"
        }
    }
})();