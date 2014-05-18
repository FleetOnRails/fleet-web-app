angular.module('fleetonrails.controllers.fuel-controller', [])

    .controller('fuelController', ['$scope', 'FuelService', 'CarsService','$location', '$routeParams','MeService', '$timeout',
        function ($scope, FuelService,CarsService, $location, $routeParams,MeService,$timeout) {

        $scope.options = [{ name: "True", id: 1 }, { name: "False", id: 2 }];
        $scope.selectedOption = $scope.options[1];

        $scope.optionsFuel = [{ name: "Petrol", id: 1 }, { name: "Diesel", id: 2 }];
        $scope.selectedOptionFuel = $scope.optionsFuel[1];

        $scope.alerts = [];

        $scope.fuel_entries = [];

        $scope.fuel_data = [] ;

        $scope.gauge_data = [];

        $scope.total_fuel_price = [];
        $scope.pending = true;

        $scope.personalNav = true;
        $scope.groupNav = false;


        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.CollapseDemoCtrl = function(){
            $scope.isCollapsed = false;

        }

        $scope.changeToAddFuel = function(){
            $location.path('/car/' + $routeParams.id + '/add_fuel');
        }

        getCar = function (id) {
            CarsService.show(id, function (data) {
                $scope.car = data['car'];
            });
        };

        $scope.chartConfig = {
            //This is not a highcharts object. It just looks a little like one!

            options: {
                //This is the Main Highcharts chart config. Any Highchart options are valid here.
                //will be overriden by values specified below.
                chart: {
                    type: 'line',
                    zoomType: 'x'
                },
                rangeSelector: {enabled: true},
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                },
                plotOptions: {
                    series: {
                        stacking: ''
                    }
                }
            },

            //The below properties are watched separately for changes.

            //Series object - a list of series using normal highcharts series options.
            series: [ ],
            //Title configuration
            title: {
                text: 'Fuel over time'
            },
            //Boolean to control showing loading status on chart
            loading: false,
            //Configuration for the xAxis. Currently only one x axis can be dynamically controlled.
            //properties currentMin and currentMax provided 2-way binding to the chart's maximum and minimum
            xAxis: {
                type: 'datetime',
                maxZoom: 2 * 3600000 // 2 hours
            },
            //Whether to use HighStocks instead of HighCharts. Defaults to false.
            useHighStocks: false
        };

        var sort_by = function(field, reverse, primer){
            console.log('inside sort_by');
            var key = function (x) {return primer ? primer(x[field]) : x[field]};

            return function (a,b) {
                var A = key(a), B = key(b);
                console.log('Value of a ' , A)
                return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];
            }
        }


        getFuelEntries = function(id) {
            FuelService.get(id,function (data) {
                var total=0;
                var count = 0;
                var total_fuel = 0;
                var graphData = [];
                $scope.gauge_data = [];
                $scope.dataLine = [];
                $scope.fuel_entries = [];
                angular.forEach(data, function (fuel_entries, index) {
                    angular.forEach(fuel_entries, function(value, index) {
                        $scope.fuel_entries.push(value.fuel_entry)
                        $scope.fuel_data.push(value.fuel_entry.liters)
                        graphData.push([
                            Date.parse(value.fuel_entry.date),
                            value.fuel_entry.liters
                        ]);
                        total += value.fuel_entry.liters;
                        total_fuel = total_fuel+(value.fuel_entry.liters * value.fuel_entry.price);
                        count = count + 1;
                    })
                });
                $scope.chartConfig.series.push({name: 'Fuel', type: 'spline', color: '#3276b1', data: graphData})
                $scope.total_fuel_price.push(total_fuel)
                if(count == 0){
                    count = count + 1;
                }
                $scope.gauge_data.push(
                    {label: "Fuel", value:(total/count).toFixed(2), color: "#3276b1", suffix: "L"}
                )
            });
            console.log($scope.fuel_entries);
            $scope.fuel_entries.sort(sort_by('odometer',true,parseInt));
            console.log($scope.fuel_entries);
            $scope.apply
        };

        $scope.deleteEntry = function( fuel_id,id){
            FuelService.delete($routeParams.id,fuel_id ,function(fuel_entries){
                $scope.alerts.push({msg: 'Fuel entry successfully deleted! ', type: 'success'});
                $scope.fuel_entries.splice(id, 1);
                $scope.removeAlerts();
            })
            $scope.apply
        };


        $scope.removeAlerts = function () {
            $timeout(function () {
                $scope.alerts = [];
            }, 4000);
        };


        $scope.addFuel = function(){
            var attributes = {
                fuel_entry: {
                    odometer: $scope.fuel.odometer,
                    liters: $scope.fuel.liters,
                    price: $scope.fuel.price,
                    fuel_type: $scope.selectedOptionFuel.name.toLocaleLowerCase(),
                    filling_station: $scope.fuel.filling_station,
                    date: $scope.fuel.date,
                    filled_tank: $scope.selectedOption.name.toLocaleLowerCase(),
                    location_attributes:{
                        address: $scope.fuel.location_attributes.address
                    }
                }
            };
            FuelService.create($routeParams.id,attributes, function (fuel_entry) {
                $location.path('/car/' + $routeParams.id + '/fuel');

            })
            $scope.apply

        }

        $scope.updateFuel = function() {
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
            FuelService.update($routeParams.id,$routeParams.fuel_id,attributes,function(data){
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
            getFuelEntries($routeParams.id)
            getCar($routeParams.id)
        }

    }]);