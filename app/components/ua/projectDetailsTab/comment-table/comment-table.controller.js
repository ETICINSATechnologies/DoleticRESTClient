(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaCommentTableController', uaCommentTableController);

    uaCommentTableController.$inject = ['$scope', 'close', '$state', '$filter', 'ProjectService', 'MessageBoxService', 'comment'];

    function uaCommentTableController($scope, close, $state, $filter, ProjectService, MessageBoxService, comment) {

        $scope.comment = comment;

        $scope.resetForm = function () {
            $scope.comment = {};
            $scope.endForm.$setPristine();
        };

        $scope.addComment = function () {
            alert("addComment");
            ProjectService.addComment($scope.comment)
                .success(
                    function (data) {
                        $scope.resetForm();
                        MessageBoxService.showSuccess(
                            "Opération réussie !",
                            "Le commentaire a bien été envoyé."
                        );
                        close();
                    }
                )
                .error(
                    function (data) {
                        MessageBoxService.showError(
                            "Echec de la clôture...",
                            "Le commentaire n'a pas été envoyé."
                        );
                        close();
                    }
                )
        };
    }

})();
