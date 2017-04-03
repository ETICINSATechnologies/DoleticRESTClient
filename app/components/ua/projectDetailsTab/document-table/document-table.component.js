(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('uaDocumentTableComponent', uaDocumentTableComponent());

    function uaDocumentTableComponent() {
        return {
            bindings: {},
            controller: "uaDocumentTableController",
            templateUrl: "app/components/ua/projectDetailsTab/document-table/document-table.template.html"
        }
    }
})();