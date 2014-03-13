angular.module('fleetonrails.controllers.gps-controller', [])

    .controller('gpsController', ['$scope', 'GpsService', '$location', '$routeParams', function ($scope, GpsService, $location, $routeParams) {
        $scope.cars = [];


        GpsService.get(function(){

        })

        $scope.map = {
            center: {
                latitude: 53.34991410000001,
                longitude: -6.260663699999999
            },
            zoom: 8
        };

    }]);