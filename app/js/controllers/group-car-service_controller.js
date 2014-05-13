/**
 * Created by krystian on 23/03/2014.
 */
angular.module('fleetonrails.controllers.group_car_services-controller', [])

    .controller('groupCarServiceCtrl', ['$scope', 'ServicesService','GroupsCarsService','$location', 'GroupsService','$routeParams','MeService',
        function ($scope,ServicesService ,$location, GroupsCarsService,GroupsService,$routeParams,MeService) {

            $scope.expenses = [];
            $scope.alerts = [];
            $scope.personalNav = false;
            $scope.groupNav = true;
            $scope.carId = $routeParams.car_id;


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
                    text: 'Expenses over time'
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

            $scope.CollapseDemoCtrl = function(){
                $scope.isCollapsed = false;

            }

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };


            $scope.getGroup = function(id){
                GroupsService.show(id,function(data){
                    console.log(data)
                    $scope.group = data['group'];
                })
            }


            getExpenses = function(id) {
                $scope.expenses = [];
                var graphData = [];
                ServicesService.get(id,function (data) {
                    angular.forEach(data, function (expenses, index) {
                        angular.forEach(expenses, function(value, index) {
                            $scope.expenses.push(value.expense);
                            graphData.push([
                                Date.parse(value.expense.date),
                                value.expense.price
                            ]);
                        });
                    });
                    $scope.chartConfig.series.push({name: 'Expense', type: 'spline', color: '#3276b1', data: graphData});
                });
            };

            $scope.addRecord = function(){
                var attributes = {
                    expense: {
                        odometer: $scope.expenses.odometer,
                        expense_type: $scope.expenses.expense_type,
                        description: $scope.expenses.description,
                        price : $scope.expenses.price,
                        date: $scope.expenses.date,
                        location_attributes:{
                            address: $scope.expenses.location_attributes.address
                        }
                    }
                };
                console.log(attributes)
                ServicesService.create($routeParams.car_id,attributes, function (expsenses) {
                    $scope.alerts.push({msg: 'Expense successfully created! ', type: 'success'});
                    getExpenses($routeParams.car_id)
                    $scope.apply
                    console.log(expsenses)
                })

            }

            $scope.deleteExpense = function(expenseId,id){
                ServicesService.delete($routeParams.car_id,expenseId ,function(expenses){
                    $scope.alerts = [];
                    $scope.alerts.push({msg: 'Expense successfully deleted! ', type: 'success'});

                    $scope.expenses.splice(id, 1);
                })
            };

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

            if ($routeParams && $routeParams.id) {
                getExpenses($routeParams.car_id);
                //getCar($routeParams.id);
                $scope.getGroup($routeParams.id);
            }

            MeService.get(function (user) {
                $scope.user = user;
            }, function(data) {
                alert('Not authorized')
                $location.path('/')
            });



        }]);