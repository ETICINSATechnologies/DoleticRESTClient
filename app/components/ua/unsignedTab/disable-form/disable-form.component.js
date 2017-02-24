(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaDisableFormComponent', uaDisableFormComponent());

    function uaDisableFormComponent() {
        return {
            bindings: {},
            controller: "uaDisableFormController",
            templateUrl: "app/components/ua/unsignedTab/disable-form/disable-form.template.html"
        }
    }
})();