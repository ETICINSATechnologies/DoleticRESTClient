(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('projectTableComponent', projectTableComponent());

    function projectTableComponent() {
        return {
            bindings: {},
            controller: "ProjectTableController",
            templateUrl: "app/components/dashboard/project-table/project-table.template.html"
        }
    }
})();