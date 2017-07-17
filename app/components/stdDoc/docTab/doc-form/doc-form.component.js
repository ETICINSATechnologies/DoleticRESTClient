(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('stdDocFormComponent', stdDocFormComponent());

    function stdDocFormComponent() {
        return {
            bindings: {},
            controller: "stdDocFormComponent",
            templateUrl: "app/components/hr/userTab/doc-form/doc-form.template.html"
        }
    }
})();