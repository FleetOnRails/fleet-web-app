/**
 * Created by krystian on 23/03/2014.
 */
angular.module('fleetonrails.controllers.services-controller', [])

    .controller('serviceController', ['$scope', 'ServicesService', 'CarsService','$location', '$routeParams','$filter',
        function ($scope,ServicesService, CarsService ,$location, $routeParams,$filter) {

        $scope.expenses = [];
        $scope.alerts = [];

        $scope.personalNav = true;
        $scope.groupNav = false;


        $scope.CollapseDemoCtrl = function(){
            $scope.isCollapsed = false;

        }

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

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


        getExpenses = function(id) {
            $scope.expenses = [];
            ServicesService.get(id,function (data) {
                var graphData = [];
                angular.forEach(data, function (expenses, index) {
                    angular.forEach(expenses, function(value, index) {
                        $scope.expenses.push(value.expense)
                        graphData.push([
                            Date.parse(value.expense.date),
                            value.expense.price
                        ]);
                    });
                });
                graphData = $filter('orderBy')(graphData, function(data) { return data[0]; });
                $scope.chartConfig.series.push({name: 'Expense', type: 'spline', color: '#3276b1', data: graphData})
                $scope.expenses = $filter('orderBy')($scope.expenses,'odometer');
            });

        };

        $scope.addExpense = function(){
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
            ServicesService.create($routeParams.id,attributes, function (expsenses) {
                $location.path('/car/' + $routeParams.id + '/service');
            })

        }

        $scope.deleteExpense = function(expenseId,id){
            ServicesService.delete($routeParams.id,expenseId ,function(expenses){
                $scope.alerts = [];
                $scope.alerts.push({msg: 'Expense successfully deleted! ', type: 'success'});

                $scope.expenses.splice(id, 1);
            })
        };

        $scope.changeToAddExpense = function(){
            $location.path('/car/' + $routeParams.id + '/add_expense');
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
            getExpenses($routeParams.id)
            getCar($routeParams.id)
        }

    }]);