angular.module('fleetonrails.controllers.main-controller', [])

    .controller('MainCtrl', [ '$scope', 'MeService', 'CarsService','RemindersService','FuelService','$location', 'loginService','GroupsService',
        function ($scope, MeService, CarsService,RemindersService,FuelService,$location, loginService,GroupsService) {

        var attributes = []

        $scope.cars = [];
        $scope.reminders = [];
        $scope.alerts = [];
        $scope.gauge_data = [];
        $scope.pending = true;
        $scope.href=[];
        $scope.groups = []
        $scope.count = 0;
        $scope.countGroups = 0;
        $scope.totalFuel = 0

        $scope.fuel_options = {thickness: 5, mode: "gauge", total: 100};


        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.differenceInDays = function (date,discription,reg,carID) {

            var minutes=1000*60;
            var hours=minutes*60;
            var today = new Date().getTime()
            var past = new Date(date)
            var tmp = past.getTime()

            var recent = Math.round(today/hours)
            var due = Math.round(tmp/hours)
            if(due - recent <= 24 && due - recent>=0){
                $scope.alerts.push({msg: '' + discription + ' is due for car ' + reg + ' today', type: 'warning',link: '#/car/'+ carID + '/reminders'});


            }
            else if(due < recent){
                $scope.alerts.push({msg:discription +'is Overdue' + ' for car ' + reg + '. Click to go to reminders page', type: 'danger',link: '#/car/'+ carID + '/reminders'});


            }
        };

        MeService.get(function (user) {
            $scope.user = user;
            $scope.pending = false
            $scope.getCars()
            getGroups()
        }, function(data) {
            alert('Not authorized')
            $location.path('/')
        });

        $scope.logout = function () {
            loginService.logout();
            $location.path('/');
        };

        $scope.changeToAddGroup = function(){
            $location.path('/addgroup')
        }
        $scope.changeToAddcar = function(){
            $location.path('/addcar')
        };


        $scope.changeProfile = function () {
            var attributes = {};
            angular.forEach($scope.user.me, function (value, key) {
                console.log(key + ' : ' + value);
                attributes[key] = value;
            });
            MeService.change(attributes, function (user) {
                console.log(user);
                $location.path('#/main');
            })
        };


        $scope.changePassword = function(){
          attributes = {
              me:{
              password: $scope.user.me.password,
              password_confirmation: $scope.user.me.password_confirmation,
              current_password : $scope.user.me.current_password
          }};

            console.log(attributes)
            MeService.changePassword(attributes,function(user){
                console.log(user)
            }, function(data) {

            })
        };

        getGroups = function(){
            GroupsService.get(function(groups){
                var count = 0;
                $scope.groups = []
                angular.forEach(groups, function (groups, index) {
                    angular.forEach(groups, function(value, index) {
                       $scope.groups.push(value.group)
                        count++
                    })
                });
                $scope.countGroups = count;
            })
        };

        $scope.deleteCar = function (carID,id) {
            CarsService.delete(carID, function (car) {
                console.log(car);
                $scope.cars.splice(id, 1);
            })
        };

        $scope.getCars = function () {
            CarsService.get(function (data) {
                var countCars = 0;
                var total=0;
                $scope.dataLine = [];
                $scope.gauge_data = [];
                angular.forEach(data, function (cars) {
                    var count = 0;
                    angular.forEach(cars, function (value) {
                        countCars++
                        value.car.reminders = [];
                        $scope.cars.push(value.car)

                        RemindersService.get(value.car.id,function (data) {
                            angular.forEach(data, function (reminders, index) {
                                angular.forEach(reminders, function(reminder, index) {
                                    value.car.reminders.push(reminder.reminder);
                                    $scope.differenceInDays(reminder.reminder.date,reminder.reminder.description,value.car.registration,value.car.id)
                                })
                            });
                        });

                        FuelService.get(value.car.id,function (data) {
                            angular.forEach(data, function (fuel_entries, index) {
                                angular.forEach(fuel_entries, function(value, index) {
                                    total += value.fuel_entry.liters;
                                    count = count + 1;
                                    $scope.chartConfig.series[0].data.push([
                                        Date.parse(value.fuel_entry.created_at),
                                        value.fuel_entry.liters
                                    ]);
                                })
                            });
                            if(count == 0){
                                count = count + 1;
                            }
                        });
                    })
                });

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
            series: [
                {
                    name: 'Diesel',
                    type: 'spline',
                    color: '#0A000A',
                    data: []
                }
            ],
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


    }]);