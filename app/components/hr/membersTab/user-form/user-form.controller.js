(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrUserFormController', hrUserFormController);

    hrUserFormController.$inject = ['$scope', 'close', '$filter', 'GenderService', 'DepartmentService', 'SchoolYearService', 'CountryService', 'RecruitmentEventService', 'PositionService', 'MessageBoxService', 'UserService', 'editMode', 'user'];

    function hrUserFormController($scope, close, $filter, GenderService, DepartmentService, SchoolYearService, CountryService, RecruitmentEventService, PositionService, MessageBoxService, UserService, editMode, user) {

        if (user != {}) formatUser();
        $scope.user = user;
        $scope.editMode = editMode ? editMode : false;
        $scope.genderService = GenderService;
        $scope.departmentService = DepartmentService;
        $scope.schoolYearService = SchoolYearService;
        $scope.countryService = CountryService;
        $scope.recruitmentEventService = RecruitmentEventService;
        $scope.positionService = PositionService;
        $scope.userService = UserService;

        $scope.resetForm = function () {
            $scope.user = {};
            $scope.userForm.$setPristine();
            $scope.editMode = false;
        };

        $scope.addUser = function () {
            UserService.postUser($scope.user)
                .success(
                    function (data) {
                        $('#user_form_modal').modal('hide');
                        $scope.resetForm();
                        MessageBoxService.showSuccess(
                            "Opération réussie !",
                            "L'utilisateur a été ajouté."
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

        $scope.editUser = function () {
            var name = $scope.user.fullName;
            UserService.putUser($scope.user)
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

        GenderService.getAllGenders(true);
        DepartmentService.getAllDepartments(true);
        SchoolYearService.getAllSchoolYears(true);
        CountryService.getAllCountries(true);
        PositionService.getAllPositions(true);
        RecruitmentEventService.getAllRecruitmentEvents(true);

        function formatUser() {
            if (user.gender) user.gender = user.gender.id;
            if (user.schoolYear) user.schoolYear = user.schoolYear.id;
            if (user.department) user.department = user.department.id;
            if (user.country) user.country = user.country.id;
            if (user.recruitmentEvent) user.recruitmentEvent = user.recruitmentEvent.id;
            if (user.birthDate) user.birthDate = $filter('date')(user.birthDate, "dd/MM/y");
        }
    }

})();
