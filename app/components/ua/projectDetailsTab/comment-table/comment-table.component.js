(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaCommentTableComponent', uaCommentTableComponent());

    function uaCommentTableComponent() {
        return {
            bindings: {},
            controller: "uaCommentTableController",
            templateUrl: "app/components/ua/projectDetailsTab/comment-table/comment-table.template.html"
        }
    }
})();