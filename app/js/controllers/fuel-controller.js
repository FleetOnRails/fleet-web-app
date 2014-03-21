angular.module('fleetonrails.controllers.fuel-controller', [])

    .controller('fuelController', ['$scope', 'FuelService', '$location', '$routeParams', function ($scope, FuelService, $location, $routeParams) {

        $scope.options = [{ name: "True", id: 1 }, { name: "False", id: 2 }];
        $scope.selectedOption = $scope.options[1];

        $scope.optionsFuel = [{ name: "Petrol", id: 1 }, { name: "Diesel", id: 2 }];
        $scope.selectedOptionFuel = $scope.optionsFuel[1];

        $scope.fuel_entries = [];

        $scope.fuel_data = [];


        $scope.total=function(){
            var total=0;
            angular.forEach($scope.fuel_entries, function(fuel_entry) {
                total += fuel_entry.liters;
            });
            console.log("total Fuel is " + total)
            return total;
        };


        $scope.CollapseDemoCtrl = function(){
            $scope.isCollapsed = false;

        }

        $scope.gauge_data = [
            {label: "Fuel", value: 78, color: "#5398f1", suffix: "%"}
        ];
        $scope.fuel_options = {thickness: 5, mode: "gauge", total: 100};

        $scope.addFuel = function(id){
            var attributes = {
                fuel_entry: {
                    odometer: $scope.fuel.odometer,
                    liters: $scope.fuel.liters,
                    price: $scope.fuel.price,
                    fuel_type: $scope.selectedOptionFuel.name,
                    filling_station: $scope.fuel.filling_station,
                    filled_tank: $scope.selectedOption.name.toLocaleUpperCase(),
                    location_attributes:{
                        address: $scope.fuel.location_attributes.address
                    }
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
                        $scope.fuel_data.push(value.fuel_entry.liters)
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