(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('hrRecruitmentEventTableComponent', hrRecruitmentEventTableComponent());

    function hrRecruitmentEventTableComponent() {
        return {
            bindings: {},
            controller: "hrRecruitmentEventTableController",
            templateUrl: "app/components/hr/statsTab/recruitmentEvent-table/recruitmentEvent-table.template.html"
        }
    }
})();