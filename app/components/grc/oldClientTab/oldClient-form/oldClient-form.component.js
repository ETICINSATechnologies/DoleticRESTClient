(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('grcOldClientFormComponent', grcOldClientFormComponent());

    function grcOldClientFormComponent() {
        return {
            bindings: {},
            controller: "grcOldClientFormController",
            templateUrl: "app/components/grc/oldClientTab/oldClient-form/oldClient-form.template.html"
        }
    }
})();