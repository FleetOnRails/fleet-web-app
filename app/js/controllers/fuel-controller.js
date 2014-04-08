angular.module('fleetonrails.controllers.fuel-controller', [])

    .controller('fuelController', ['$scope', 'FuelService', 'CarsService','$location', '$routeParams', function ($scope, FuelService,CarsService, $location, $routeParams) {

        $scope.options = [{ name: "True", id: 1 }, { name: "False", id: 2 }];
        $scope.selectedOption = $scope.options[1];

        $scope.optionsFuel = [{ name: "Petrol", id: 1 }, { name: "Diesel", id: 2 }];
        $scope.selectedOptionFuel = $scope.optionsFuel[1];

        $scope.alerts = [];

        $scope.fuel_entries = [];

        $scope.fuel_data = [] ;

        $scope.gauge_data = [];

        $scope.dataLine = [];

        $scope.total_fuel_price = [];
        $scope.pending = true;


        $scope.optionsLine = {
            axes: {
                x: {key: 'x', labelFunction: function(value) {return value;}, type: 'area', tooltipFormatter: function(x) {return x;}}

            },
            series: [
                {y: 'value', color: 'steelblue', thickness: '2px', striped: true, label: 'Total Price'}
            ],
            lineMode: 'linear',
            tension: 0.7
        }

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.CollapseDemoCtrl = function(){
            $scope.isCollapsed = false;

        }

        getCar = function (id) {
            CarsService.show(id, function (data) {
                $scope.car = data['car'];
            });
        };


        getFuelEntries = function(id) {
            FuelService.get(id,function (data) {
                var total=0;
                var count = 0;
                var total_fuel = 0;
                $scope.gauge_data = [];
                $scope.dataLine = [];
                angular.forEach(data, function (fuel_entries, index) {
                    angular.forEach(fuel_entries, function(value, index) {
                        $scope.fuel_entries.push(value.fuel_entry)
                        $scope.fuel_data.push(value.fuel_entry.liters)

                        $scope.dataLine.push({x: count, value: value.fuel_entry.liters * value.fuel_entry.price})

                        total += value.fuel_entry.liters;
                        total_fuel = total_fuel+(value.fuel_entry.liters * value.fuel_entry.price);
                        count = count + 1;
                    })
                });
                $scope.total_fuel_price.push(total_fuel)
                if(count == 0){
                    count = count + 1;
                }
                $scope.gauge_data.push(
                    {label: "Fuel", value:(total/count).toFixed(2), color: "#5398f1", suffix: "L"}
                )
            });
            $scope.apply
        };

        $scope.deleteEntry = function( fuel_id){

            FuelService.delete($routeParams.id,fuel_id ,function(fuel_entries){
                // TODO fixed the table update after deletion
                //console.log(fuel_entries);
                //$scope.fuel_entries($scope.fuel_entries.indexOf(fuel_id),1);
            })
        };


        $scope.addFuel = function(){
            var attributes = {
                fuel_entry: {
                    odometer: $scope.fuel.odometer,
                    liters: $scope.fuel.liters,
                    price: $scope.fuel.price,
                    fuel_type: $scope.selectedOptionFuel.name,
                    filling_station: $scope.fuel.filling_station,
                    date: $scope.fuel.date,
                    filled_tank: $scope.selectedOption.name.toLocaleUpperCase(),
                    location_attributes:{
                        address: $scope.fuel.location_attributes.address
                    }
                }
            };
            console.log($scope.selectedOption.name)
            console.log(attributes)
            FuelService.create($routeParams.id,attributes, function (fuel_entry) {
                console.log(fuel_entry)
                $scope.alerts.push({msg: 'Fuel entry successfully created! ', type: 'success'});
                $scope.pending = false

            })
            $scope.apply

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



        $scope.toggleMin = function() {
            $scope.minDate = ( $scope.minDate ) ? null : new Date();
        };
        $scope.toggleMin();

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
            getFuelEntries($routeParams.id)
            getCar($routeParams.id)
        } else {
            console.log('something wrong')
        }

    }]);