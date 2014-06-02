angular.module('fleetonrails.controllers.fuel_edit-controller', [])

    .controller('fuelEditCtrl', ['$scope', 'FuelService', 'CarsService','$location', '$routeParams','MeService', '$timeout',
        function ($scope, FuelService,CarsService, $location, $routeParams,MeService,$timeout) {

            $scope.options = [{ name: "True", id: 1 }, { name: "False", id: 2 }];
            $scope.selectedOption = $scope.options[1];

            $scope.optionsFuel = [{ name: "Petrol", id: 1 }, { name: "Diesel", id: 2 }];
            $scope.selectedOptionFuel = $scope.optionsFuel[1];

            $scope.alerts = [];

            getCar = function (id) {
                CarsService.show(id, function (data) {
                    $scope.car = data['car'];
                });
            };

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

            getFuelEntry = function(id) {
                FuelService.show(id,$routeParams.fuel_id,function (data) {
                    console.log('Got the fuel entry ', data)
                    $scope.fuel = data;
                    if($scope.fuel.fuel_entry.filled_tank==true){
                        $scope.selectedOption = $scope.options[0];
                    }
                    else if($scope.fuel.fuel_entry.filled_tank==false){
                        $scope.selectedOption = $scope.options[1];
                    }
                });

            };

            $scope.updateFuel = function() {
                var attributes = {
                    fuel_entry: {
                        odometer: $scope.fuel.fuel_entry.odometer,
                        liters: $scope.fuel.fuel_entry.liters,
                        price: $scope.fuel.fuel_entry.price,
                        fuel_type: $scope.selectedOptionFuel.name.toLocaleUpperCase(),
                        filling_station: $scope.fuel.fuel_entry.filling_station,
                        date: $scope.fuel.fuel_entry.date,
                        filled_tank: $scope.selectedOption.name.toLocaleUpperCase(),
                        location_attributes:{
                            address: $scope.fuel.fuel_entry.location.address
                        }
                    }
                };
                FuelService.update($routeParams.id,$routeParams.fuel_id,attributes,function(data){
                    $location.path('/car/' + $routeParams.id + '/fuel');
                },function(data){
                    $scope.alerts.push({msg: 'Missing values', type: 'danger'});
                })
            }

            $scope.today = function() {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.showWeeks = true;
            $scope.toggleWeeks = function () {
                $scope.showWeeks = ! $scope.showWeeks;
            };

            $scope.clear = function () {
                $scope.dt = null;
            };

            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

            $scope.dateOptions = {
                'year-format': "'yy'",
                'starting-day': 1
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
            $scope.format = $scope.formats[0];

            $scope.fuel_options = {thickness: 5, mode: "gauge", total: 100};

            if ($routeParams && $routeParams.id) {
                getFuelEntry($routeParams.id)
                getCar($routeParams.id)
            }

        }]);/**
 * Created by krystian on 11/05/2014.
 */
