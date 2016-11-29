(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('messageBoxComponent', MessageBoxComponent());

    function MessageBoxComponent() {
        return {
            bindings: {},
            controller: "MessageBoxController",
            templateUrl: "app/components/message-box/message-box.template.html"
        }
    }
})();