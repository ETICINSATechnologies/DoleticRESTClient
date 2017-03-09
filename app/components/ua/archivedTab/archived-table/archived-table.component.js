(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaArchivedTableComponent', uaArchivedTableComponent());

    function uaArchivedTableComponent() {
        return {
            bindings: {},
            controller: "uaArchivedTableController",
            templateUrl: "app/components/ua/archivedTab/archived-table/archived-table.template.html"
        }
    }
})();