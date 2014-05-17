angular.module('fleetonrails.controllers.car-controller', [])

    .controller('carController', ['$scope', 'CarsService', '$location', '$timeout', '$interval', 'MeService','$routeParams','FuelService','ServicesService',
        function ($scope, CarsService, $location, $timeout, $interval,MeService, $routeParams,FuelService,ServicesService) {
            $scope.cars = [];

            $scope.pending = true
            $scope.gauge_data = [];
            $scope.haveDiagnosticData = false
            $scope.haveGpsData = false
            $scope.fuel_options = {thickness: 5, mode: "gauge", total: 200};

            $scope.personalNav= true;
            $scope.groupNav = false;

            $scope.fuelCost = 0;
            $scope.serviceCost = 0;
            $scope.costKm = 0;
            $scope.MPG = 0;

            var dynamicMarkers = [];
            var center = {
                latitude: 54,
                longitude: -7
            }

            angular.extend($scope, {
                map: {
                    control: {},
                    showTraffic: true,
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
                    $scope.gauge_data = [];
                    $scope.car = data['car'];
                    if ($scope.car.current_gps_statistic) {
                        dynamicMarkers = [
                            {
                                latitude: $scope.car.current_gps_statistic.latitude,
                                longitude: $scope.car.current_gps_statistic.longitude,
                                showWindow: false
                            }
                        ];

                        center = {
                            latitude: $scope.car.current_gps_statistic.latitude,
                            longitude: $scope.car.current_gps_statistic.longitude
                        };
                        $scope.haveGpsData = true;
                    }
                    else {
                        $scope.haveGpsData = true;
                        dynamicMarkers = [];
                    }
                    $scope.gauge_data.push(
                        {label: "Speed", value:$scope.car.current_gps_statistic.kmh.toFixed(0), color: "#5398f1", suffix: "Km/h"}
                    )

                });
            };

            $scope.calcFuelCost = function(){
                FuelService.get($routeParams.id,function(data){
                    var cost = 0;
                    angular.forEach(data, function (fuel_entries, index) {
                        angular.forEach(fuel_entries, function(value, index) {
                            cost = cost+(value.fuel_entry.liters * value.fuel_entry.price);
                        })
                    });
                    $scope.fuelCost= cost;
                });
            };

            $scope.calcExpensecost = function() {
                ServicesService.get($routeParams.id,function (data) {
                    var cost = 0;
                    angular.forEach(data, function (expenses, index) {
                        angular.forEach(expenses, function(value, index) {
                            cost = cost + value.expense.price
                        });
                    });
                    $scope.serviceCost = cost;
                });

            };

            $scope.addCar = function () {
                CarsService.create({car: $scope.car}, function (car) {
                    $location.path('/main')
                    console.log('Success',car);
                })

            };

            $scope.updateCar = function () {
                CarsService.change($routeParams.id, {car: $scope.car}, function (car) {
                    console.log(car);
                    $location.path('/car/' + $routeParams.id)
                })
            };

            $scope.deleteCar = function (carID,id) {
                CarsService.delete(carID, function (car) {
                    console.log(car);
                    $scope.cars.splice(id, 1);
                })
            };

            $scope.stopInterval = function(){
                console.log('Stope interval')
                $interval.cancel(timeInterval);
            }

            if ($routeParams && $routeParams.id) {
                $scope.getCar($routeParams.id);
                $scope.calcFuelCost();
                $scope.calcExpensecost();
                var timeInterval = $interval(function() {
                    $scope.getCar($routeParams.id)
                    $scope.map.dynamicMarkers = dynamicMarkers;
                    $scope.map.center = center;
                    $scope.apply
                }, 5000)
                $scope.$on('$destroy', function () { $interval.cancel(timeInterval); });
            } else {
                $scope.getCars();
            }

            $timeout(function () {
                $scope.map.dynamicMarkers = dynamicMarkers;
                $scope.map.center = center;
                $scope.pending = false
            }, 2000);
        }]);