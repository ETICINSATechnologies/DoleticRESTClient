(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('hrTeamTableComponent', hrTeamTableComponent());

    function hrTeamTableComponent() {
        return {
            bindings: {},
            controller: "hrTeamTableController",
            templateUrl: "app/components/hr/teamsTab/team-table/team-table.template.html"
        }
    }
})();