(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('ProfileFormController', ProfileFormController);

    ProfileFormController.$inject = ['$scope', 'close', '$filter', '$state', 'SharedVariables', 'MessageBoxService', 'UserService', 'CountryService', 'GenderService', 'YearService', 'DepartmentService', 'profile'];

    function ProfileFormController($scope, close, $filter, $state, SharedVariables, MessageBoxService, UserService, CountryService, GenderService, YearService, DepartmentService, profile) {

        $scope.$state = $state;
        $scope.sharedVariables = SharedVariables;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.currentUser.activePosition = _.find($scope.currentUser.positions, 'active');
        $scope.updateProfile = updateProfile;
        $scope.CountryService = CountryService;
        $scope.GenderService = GenderService;
        $scope.YearService = YearService;
        $scope.DepartmentService = DepartmentService;
        if(profile!={})formatProfile();
        $scope.profile = profile;

        $scope.resetForm = function () {
            $scope.profile = {};
            $scope.profileForm.$setPristine();
        };

        function updateProfile() {
            UserService.updateProfile($scope.profile)
                .success(function (data) {
                    $('#profile_form_modal').modal('hide');
                    $scope.resetForm();
                    MessageBoxService.showSuccess(
                        "Opération réussie !",
                        "Le profile a été modifié avec succès !"
                    );
                    close();
                }).error(function (data) {
                    $('#profile_form_modal').modal('hide');
                    MessageBoxService.showError(
                        "Echec de la modification...",
                        "Le profile n'a pas pu être modifié.");
                }
            );
        }

        CountryService.getAllCountries(true);
        GenderService.getAllGenders(true);
        YearService.getAllYears(true);
        DepartmentService.getAllDepartments(true);

        function formatProfile() {
            if(profile.country)profile.country = profile.country.id;
            if(profile.gender)profile.gender = profile.gender.id;
            if(profile.schoolYear)profile.schoolYear = profile.schoolYear.id;
            if(profile.department)profile.department = profile.department.id;
            if (profile.birthDate) profile.birthDate = $filter('date')(profile.birthDate, "dd/MM/y");
            if(profile.recruitmentEvent) profile.recruitmentEvent = profile.recruitmentEvent.id;
        }

    }

})();