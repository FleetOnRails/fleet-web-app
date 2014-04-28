angular.module('fleetonrails.controllers.gps-controller', [])

    .controller('gpsController', ['$scope', 'GpsService', 'CarsService', '$timeout', '$routeParams', function ($scope, GpsService, CarsService, $timeout, $routeParams) {
        $scope.my_cars = []

        var dynamicMarkers = [];
        var center = {
            latitude: 54,
            longitude: -7
        }

        angular.extend($scope, {
            map: {
                control: {},
                showTraffic: false,
                showBicycling: false,
                showWeather: false,
                showHeat: false,
                center: center,
                options: {
                    streetViewControl: true,
                    panControl: false,
                    maxZoom: 20,
                    minZoom: 3
                },
                zoom: 5,
                dragging: false,
                bounds: {},
                dynamicMarkers: []
            }
        });


        CarsService.get(function (data) {
            $scope.my_cars = []
            angular.forEach(data, function (cars, index) {
                angular.forEach(cars, function (value, index) {
                    $scope.my_cars.push(value.car)
                    console.log(value.car)
                    if(value.car.current_gps_statistic){
                        dynamicMarkers.push(
                            {
                                latitude: value.car.current_gps_statistic.latitude,
                                longitude: value.car.current_gps_statistic.longitude,
                                showWindow: true
                            })
                    }
                })
            });
        });


        $timeout(function () {
            $scope.map.dynamicMarkers = dynamicMarkers;
            $scope.map.center = center;
            $scope.pending = false
        }, 2000);
    }]);