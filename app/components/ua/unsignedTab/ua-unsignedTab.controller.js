(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaUnsignedTabController', uaUnsignedTabController);

    uaUnsignedTabController.$inject = ['$scope', 'ModalService', 'ProjectService'];

    function uaUnsignedTabController($scope, ModalService, ProjectService) {

        $scope.projectService = ProjectService;

        $scope.showProjectForm = function () {
            ModalService.showModal({
                templateUrl: "app/components/ua/unsignedTab/project-form/project-form.template.html",
                controller: "uaProjectFormController",
                inputs:{
                    editMode: false,
                    project:{}
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

    }
})();