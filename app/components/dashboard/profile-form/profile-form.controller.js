(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('ProfileFormController', ProfileFormController);

    ProfileFormController.$inject = ['$scope', 'close', '$filter', '$state', 'MessageBoxService', 'UserService', 'CountryService', 'GenderService', 'SchoolYearService', 'DepartmentService', 'profile'];

    function ProfileFormController($scope, close, $filter, $state, MessageBoxService, UserService, CountryService, GenderService, SchoolYearService, DepartmentService, profile) {

        $scope.$state = $state;
        $scope.countryService = CountryService;
        $scope.genderService = GenderService;
        $scope.schoolYearService = SchoolYearService;
        $scope.departmentService = DepartmentService;
        if(profile!={})formatProfile();
        $scope.profile = profile;

        $scope.resetForm = function () {
            $scope.profile = {};
            $scope.profileForm.$setPristine();
        };

        $scope.updateProfile = function() {
            UserService.updateProfile($scope.profile)
                .success(function (data) {
                    $('#profile_form_modal').modal('hide');
                    $scope.resetForm();
                    MessageBoxService.showSuccess(
                        "Opération réussie !",
                        "Le profil a été modifié avec succès !"
                    );
                    close();
                }).error(function (data) {
                    $('#profile_form_modal').modal('hide');
                    MessageBoxService.showError(
                        "Echec de la modification...",
                        "Le profil n'a pas pu être modifié.");
                }
            );
        };

        CountryService.getAllCountries(true);
        GenderService.getAllGenders(true);
        SchoolYearService.getAllSchoolYears(true);
        DepartmentService.getAllDepartments(true);

        function formatProfile() {
            if(profile.country)profile.country = profile.country.id;
            if(profile.gender)profile.gender = profile.gender.id;
            if(profile.schoolYear)profile.schoolYear = profile.schoolYear.id;
            if(profile.department)profile.department = profile.department.id;
            if(profile.birthDate) profile.birthDate = $filter('date')(profile.birthDate, "dd/MM/y");
            if(profile.recruitmentEvent) profile.recruitmentEvent = profile.recruitmentEvent.id;
        }

    }

})();