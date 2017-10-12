(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('stdDocTableComponent', stdDocTableComponent());

    function stdDocTableComponent() {
        return {
            bindings: {},
            controller: "stdDocTableController",
            templateUrl: "app/components/stdDoc/docTab/doc-table/doc-table.template.html"
        }
    }
})();