angular.module('fleetonrails.controllers.fuel-controller', [])

    .controller('fuelController', ['$scope', 'FuelService', '$location', '$routeParams', function ($scope, FuelService, $location, $routeParams) {

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
            FuelService.create(id,attributes, function (fuel_entry) {
                console.log(fuel_entry)
            })
        }

    }]);