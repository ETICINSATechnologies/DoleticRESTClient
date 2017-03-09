(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaDisabledTableComponent', uaDisabledTableComponent());

    function uaDisabledTableComponent() {
        return {
            bindings: {},
            controller: "uaDisabledTableController",
            templateUrl: "app/components/ua/disabledTab/disabled-table/disabled-table.template.html"
        }
    }
})();