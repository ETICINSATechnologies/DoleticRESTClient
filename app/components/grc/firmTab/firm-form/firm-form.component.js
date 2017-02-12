(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('grcFirmFormComponent', grcFirmFormComponent());

    function grcFirmFormComponent() {
        return {
            bindings: {},
            controller: "grcFirmFormController",
            templateUrl: "app/components/grc/firmTab/firm-form/firm-form.template.html"
        }
    }
})();