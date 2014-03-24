angular.module('fleetonrails.controllers.car-controller', [])

    .controller('carController', ['$scope', 'CarsService', '$location', '$timeout', '$routeParams',
        function ($scope, CarsService, $location, $timeout, $routeParams) {
            $scope.cars = [];

            var dynamicMarkers = [];

            angular.extend($scope, {
                map: {
                    control: {},
                    showTraffic: true,
                    showBicycling: false,
                    showWeather: false,
                    showHeat: false,
                    center: {
                        latitude: 54,
                        longitude: -7
                    },
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

            $scope.getCars = function () {
                CarsService.get(function (data) {
                    angular.forEach(data, function (cars) {
                        angular.forEach(cars, function (value) {
                            $scope.cars.push(value.car)
                        })
                    });
                });
            };

            $scope.getCar = function (id) {
                CarsService.show(id, function (data) {
                    $scope.car = data['car'];
                    if ($scope.car.current_gps_statistic) {

                        dynamicMarkers = [
                            {
                                latitude: $scope.car.current_gps_statistic.latitude,
                                longitude: $scope.car.current_gps_statistic.longitude,
                                showWindow: false
                            }
                        ];
                    }
                    else {
                        dynamicMarkers = [];
                    }

                });
            };

            $scope.addCar = function () {
                var attributes = {
                    car: {
                        make: $scope.car.make,
                        model: $scope.car.model,
                        registration: $scope.car.registration
                    }
                };
                console.log(attributes);
                CarsService.create(attributes, function (car) {
                    console.log(car);
                })

            };

            $scope.updateCar = function () {
                var attributes = {
                    car: {
                        make: $scope.car.make,
                        model: $scope.car.model,
                        registration: $scope.car.registration
                    }
                };

                CarsService.change($routeParams.id, attributes, function (car) {
                    console.log(car);
                    $location.path('/car/' + $routeParams.id)
                })
            };

            $scope.deleteCar = function (id) {
                CarsService.delete($routeParams.id, function (car) {
                    console.log(car);
                    $scope.cars.splice($scope.cars.indexOf(id), 1);
                })
            };

            if ($routeParams && $routeParams.id) {
                $scope.getCar( $routeParams.id)
            } else {
                $scope.getCars();
            }

            $timeout(function () {
                $scope.map.dynamicMarkers = dynamicMarkers;
            }, 2000);
        }]);