(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('ProfileFormController', ProfileFormController);

    ProfileFormController.$inject = ['$scope', '$state', 'SharedVariables', 'MessageBoxService', 'UserService'];

    function ProfileFormController($scope, $state, SharedVariables, MessageBoxService, UserService) {

        $scope.$state = $state;
        $scope.sharedVariables = SharedVariables;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.currentUser.activePosition = _.find($scope.currentUser.positions, 'active');
        $scope.cancelProfileForm = cancelProfileForm;
        $scope.updateProfile = updateProfile;
        $scope.getAllCountries = getAllCountries;
        $scope.getAllDepartments = getAllDepartments;
        $scope.setGender = setGender;
        $scope.setCountry = setCountry;
        $scope.setYear = setYear;
        $scope.setDepartment = setDepartment;
        $scope.profile= {};
        $scope.genders = [];
        $scope.countries = [];
        $scope.years = [];
        $scope.departments = [];

        function setGender(gender) {
            $scope.profile.gender = gender;
        }

        function setCountry(country) {
            $scope.profile.country = country;
        }

        function setYear(year) {
            $scope.profile.year = year;
        }

        function setDepartment(dept){
            $scope.profile.dept = dept;
        }

        function getAllCountries(){
            CountryService.getAllCountries()
                .success(
                    function (data) {
                        $scope.countries = data.countries;
                        $('#country_search').dropdown();
                    }
                ).error(
                function (data) {
                    console.log(data);
                }
            );
        }

        function getAllDepartments() {
            DepartmentService.getAllDepartments()
                .success(
                    function (data) {
                        $scope.departments = data.departments;
                        $('#dept_search').dropdown();
                    }
                ).error(
                function (data) {
                    console.log(data);
                }
            );
        }

        function getAllYears() {
            DepartmentService.getAllYears()
                .success(
                    function (data) {
                        $scope.years = data.years;
                        $('#year_search').dropdown();
                    }
                ).error(
                function (data) {
                    console.log(data);
                }
            );
        }

        function getAllGenders() {
            DepartmentService.getAllGenders()
                .success(
                    function (data) {
                        $scope.genders = data.genders;
                        $('#gender_search').dropdown();
                    }
                ).error(
                function (data) {
                    console.log(data);
                }
            );
        }

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
                    if(data.code ==0){
                        MessageBoxService.showSuccess('Succès !', 'Profile mis à jour avec succès !' );
                    } else {
                        MessageBoxService.handleServiceError(data);
                    }
                }
            );
        }

        getAllDepartments();
        getAllCountries();
        getAllGenders();
        getAllYears();

    }