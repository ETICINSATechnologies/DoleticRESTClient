(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('fixModalComponent', FixModalComponent());

    function FixModalComponent() {
        return {
            bindings: {},
            controller: "FixModalController",
            templateUrl: "app/components/fix-modal/fix-modal.template.html"
        }
    }
})();