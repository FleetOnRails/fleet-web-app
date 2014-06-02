angular.module('fleetonrails.controllers.group_car_fuel_edit-controller', [])

    .controller('groupFuelEditCtrl', ['$scope', 'FuelService', 'GroupsCarsService','$location', '$routeParams','GroupsService', '$timeout',
        function ($scope, FuelService,GroupsCarsService, $location, $routeParams,GroupsService,$timeout) {

            $scope.options = [{ name: "True", id: 1 }, { name: "False", id: 2 }];
            $scope.selectedOption = $scope.options[1];

            $scope.optionsFuel = [{ name: "Petrol", id: 1 }, { name: "Diesel", id: 2 }];
            $scope.selectedOptionFuel = $scope.optionsFuel[1];

            $scope.alerts = [];

            getCar = function (id) {
                GroupsCarsService.show(id, $routeParams.car_id,function (data) {
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
                });

            };

            $scope.getGroup = function(id){
                GroupsService.show(id,function(data){
                    console.log(data)
                    $scope.group = data['group'];
                })
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
                FuelService.update($routeParams.car_id,$routeParams.fuel_id,attributes,function(data){
                    $location.path('/group/' + $routeParams.id + '/car/' + $routeParams.car_id +'/fuel');
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
                getFuelEntry($routeParams.car_id);
                getCar($routeParams.id);
                $scope.getGroup($routeParams.id)
            }

        }]);/**

/**
 * Created by krystian on 23/05/2014.
 */
