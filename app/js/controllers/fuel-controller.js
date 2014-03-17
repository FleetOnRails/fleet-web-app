angular.module('fleetonrails.controllers.fuel-controller', [])

    .controller('fuelController', ['$scope', 'FuelService', '$location', '$routeParams', function ($scope, FuelService, $location, $routeParams) {

        $scope.fuel_entries = [];

        $scope.addFuel = function(id){
            var attributes = {
                fuel_entry: {
                    odometer: $scope.fuel.odometer,
                    liters: $scope.fuel.liters,
                    price: $scope.fuel.price,
                    fuel_type: $scope.fuel.fuel_type,
                    filling_station: $scope.fuel.filling_station,
                    filled_tank: $scope.fuel.filled_tank
                }
            };
            console.log(attributes)
            FuelService.create(id,attributes, function (fuel_entry) {
                console.log(fuel_entry)
            })
        }

        $scope.getFuelEntries = function(id) {
            FuelService.get(id,function (data) {
                angular.forEach(data, function (fuel_entries, index) {
                    angular.forEach(fuel_entries, function(value, index) {
                        $scope.fuel_entries.push(value.fuel_entry)
                    })
                });
            });
        };

        if ($routeParams && $routeParams.id) {
            $scope.getFuelEntries($routeParams.id)
        } else {
            console.log('something wrong')
        }

    }]);