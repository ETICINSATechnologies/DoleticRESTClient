(function () {
    'use strict';

    angular
        .module('doleticApp')
        .service('ConfirmModalService', confirmModalService);

    confirmModalService.$inject = [];

    function confirmModalService() {

        var service = this;

        service.title = null;
        service.content = null;
        service.icon = "info circle";
        service.callback = null;

        this.showConfirmModal = function (title, content, icon, callback) {
            service.title = title;
            service.content = content;
            service.icon = icon;
            service.callback = callback;
            $('#confirm_modal').modal('show');
        };

    }

})();