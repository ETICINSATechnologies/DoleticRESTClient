(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('navBarComponent', NavBarComponent());

    function NavBarComponent() {
        return {
            bindings: {},
            controller: "NavbarController",
            templateUrl: "app/components/navbar/navbar.template.html"
        }
    }
})();