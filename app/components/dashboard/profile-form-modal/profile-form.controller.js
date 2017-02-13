(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('ProfileFormController', ProfileFormController);

    ProfileFormController.$inject = ['$scope', '$state', 'SharedVariables', 'MessageBoxService', 'UserService', 'CountryService', 'GenderService', 'YearService', 'DepartmentService'];

    function ProfileFormController($scope, $state, SharedVariables, MessageBoxService, UserService, CountryService, GenderService, YearService, DepartmentService) {

        $scope.$state = $state;
        $scope.sharedVariables = SharedVariables;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.currentUser.activePosition = _.find($scope.currentUser.positions, 'active');
        $scope.updateProfile = updateProfile;
        $scope.CountryService = CountryService;
        $scope.GenderService = GenderService;
        $scope.YearService = YearService;
        $scope.DepartmentService = DepartmentService;
        $scope.profile = {};

        function updateProfile() {
            UserService.updateProfile(
                $scope.profile.gender,
                $scope.profile.firstName,
                $scope.profile.lastName,
                $scope.profile.mail,
                $scope.profile.birthDate,
                $scope.profile.department,
                $scope.profile.year,
                $scope.profile.recruitmentEvent,
                $scope.profile.tel,
                $scope.profile.address,
                $scope.profile.city,
                $scope.profile.postalCode,
                $scope.profile.country,
                function (data) {
                    if (data.code == 0) {
                        MessageBoxService.showSuccess('Succès !', 'Profile mis à jour avec succès !');
                    } else {
                        MessageBoxService.handleServiceError(data);
                    }
                }
            );
        }

        CountryService.getAllCountries(true);
        GenderService.getAllGenders(true);
        YearService.getAllYears(true);
        DepartmentService.getAllDepartments(true);

    }

})