(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('grcProspectFormComponent', grcProspectFormComponent());

    function grcProspectFormComponent() {
        return {
            bindings: {},
            controller: "grcProspectFormController",
            templateUrl: "app/components/grc/prospectTab/prospect-form/prospect-form.template.html"
        }
    }
})();