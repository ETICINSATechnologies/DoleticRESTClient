(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaTaskFormComponent', uaTaskFormComponent());

    function uaTaskFormComponent() {
        return {
            bindings: {},
            controller: "uaTaskFormController",
            templateUrl: "app/components/ua/contactDetailsTab/task-form/task-form.template.html"
        }
    }
})();