(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaProjectFormComponent', uaProjectFormComponent());

    function uaProjectFormComponent() {
        return {
            bindings: {},
            controller: "uaProjectFormController",
            templateUrl: "app/components/ua/unsignedTab/project-form/project-form.template.html"
        }
    }
})();