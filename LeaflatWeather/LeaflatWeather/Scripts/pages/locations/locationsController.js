﻿/// <reference path="../../angular.js" />
(function (angular) {
    angular.module("weatherModule")
        .controller("locationsController", locationsController);

    locationsController.$inject = ["$scope", "locationsService"];

    function locationsController($scope, locationsService) {
        $scope.allLocations = [];
        $scope.countries = [];

        function activate() {
            locationsService.getAllLocations()
                .then(function (response) {
                    console.log(response.data);
                    $scope.allPages = response.data.allPages;
                    $scope.allLocations = response.data.locations;
                },
                function errorCallback(error) {
                    console.log(error.status);
                });

            locationsService.getCountries()
                .then(function (response) {
                    $scope.countries = response.data;
                    console.log(response.data);
                },
                function errorCalback(error) {
                    console.log(error.status)
                });
        };

        activate();

        $scope.getPage = function (page) {
            locationsService.getAllLocations(page)
                            .then(function (response) {
                                $scope.allPages = response.data.allPages;
                                $scope.allLocations = response.data.locations;
                            }, function myError(response) {
                                console.log(response.statusText);
                            });
        };

        $scope.getMap = function (lat, lng) {
            localStorage.setItem("lat", lat);
            localStorage.setItem("lng", lng);
            location.assign("/Home/Index");
        };
    }
})(angular);