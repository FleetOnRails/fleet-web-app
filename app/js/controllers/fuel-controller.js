angular.module('fleetonrails.controllers.fuel-controller', [])

    .controller('fuelController', ['$scope', 'FuelService', '$location', '$routeParams', function ($scope, FuelService, $location, $routeParams) {

        $scope.options = [{ name: "true", id: 1 }, { name: "false", id: 2 }];
        $scope.selectedOption = $scope.options[1];

        $scope.optionsFuel = [{ name: "Petrol", id: 1 }, { name: "Diesel", id: 2 }];
        $scope.selectedOptionFuel = $scope.optionsFuel[1];

        $scope.fuel_entries = [];



        $scope.addFuel = function(id){
            var attributes = {
                fuel_entry: {
                    odometer: $scope.fuel.odometer,
                    liters: $scope.fuel.liters,
                    price: $scope.fuel.price,
                    fuel_type: $scope.selectedOptionFuel.name,
                    filling_station: $scope.fuel.filling_station,
                    filled_tank: $scope.selectedOption.name
                }
            };
            console.log($scope.selectedOption.name)
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

        $scope.deleteEntry = function(id, fuel_id){

            FuelService.delete(id,fuel_id ,function(car){
                // TODO fixed the table update after deletion
                //console.log(fuel_entries);
                //$scope.fuel_entries($scope.fuel_entries.indexOf(fuel_id),1);
            })
        };

        if ($routeParams && $routeParams.id) {
            $scope.getFuelEntries($routeParams.id)
        } else {
            console.log('something wrong')
        }

    }]);