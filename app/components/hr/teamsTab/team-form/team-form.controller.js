(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrTeamFormController', hrTeamFormController);

    hrTeamFormController.$inject = ['$scope', 'close', '$filter', 'GenderService', 'DepartmentService', 'SchoolYearService', 'CountryService', 'RecruitmentEventService', 'PositionService', 'MessageBoxService', 'TeamService', 'editMode', 'user'];

    function hrTeamFormController($scope, close, $filter, GenderService, DepartmentService, SchoolYearService, CountryService, RecruitmentEventService, PositionService, MessageBoxService, TeamService, editMode, user) {

        if (user != {}) formatTeam();
        $scope.user = user;
        $scope.editMode = editMode ? editMode : false;
        $scope.genderService = GenderService;
        $scope.departmentService = DepartmentService;
        $scope.schoolYearService = SchoolYearService;
        $scope.countryService = CountryService;
        $scope.recruitmentEventService = RecruitmentEventService;
        $scope.positionService = PositionService;
        $scope.userService = TeamService;

        $scope.resetForm = function () {
            $scope.user = {};
            $scope.userForm.$setPristine();
            $scope.editMode = false;
        };

        $scope.addTeam = function () {
            ContactService.postTeam($scope.user)
                .success(
                    function (data) {
                        $('#user_form_modal').modal('hide');
                        $scope.resetForm();
                        MessageBoxService.showSuccess(
                            "Opération réussie !",
                            "L(utilisateur a été ajouté."
                        );
                        close();
                    }
                )
                .error(
                    function (data) {
                        $('#user_form_modal').modal('hide');
                        MessageBoxService.showError(
                            "Echec de l'ajout...",
                            "L'utilisateur n'a pas pu être ajouté."
                        );
                    }
                )
        };

        $scope.editTeam = function () {
            var name = $scope.user.fullName;
            ContactService.putTeam($scope.user)
                .success(function (data) {
                    $('#user_form_modal').modal('hide');
                    $scope.resetForm();
                    MessageBoxService.showSuccess(
                        "Opération réussie !",
                        "L'utilisateur " + name + " a été modifié !"
                    );
                    close();
                }).error(function (data) {
                    $('#user_form_modal').modal('hide');
                    MessageBoxService.showError(
                        "Echec de la modification...",
                        "L'utilisateur n'a pas pu être modifié.");
                }
            );
        };

        function formatTeam() {
            if (user.gender) user.gender = user.gender.id;
            if (user.schoolYear) user.schoolYear = user.schoo+lYear.id;
            if (user.department) user.department = user.department.id;
            if (user.country) user.country = user.country.id;
            if (user.recruitmentEvent) user.recruitmentEvent = user.recruitmentEvent.id;
            if (user.birthDate) user.birthDate = $filter('date')(user.birthDate, "dd/MM/y");
        }

        GenderService.getAllGenders(true);
        DepartmentService.getAllDepartments(true);
        SchoolYearService.getAllSchoolYears(true);
        TeamService.getAllTeams(true);
    }

})();
