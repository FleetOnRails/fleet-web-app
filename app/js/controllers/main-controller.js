angular.module('fleetonrails.controllers.main-controller', [])

    .controller('MainCtrl', [ '$scope', 'MeService', 'CarsService','RemindersService','FuelService','$location', 'loginService',
        function ($scope, MeService, CarsService,RemindersService,FuelService,$location, loginService) {

        var attributes = []

        $scope.cars = [];
        $scope.reminders = [];
        $scope.alerts = [];
        $scope.gauge_data = [];
        $scope.pending = true;
        $scope.fuel_options = {thickness: 5, mode: "gauge", total: 100};


            $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.differenceInDays = function (date,discription,reg) {

            var minutes=1000*60;
            var hours=minutes*60;
            //var days=hours*24;
            var today = new Date().getTime()
            var past = new Date(date)
            var tmp = past.getTime()

            var recent = Math.round(today/hours)
            var due = Math.round(tmp/hours)
            console.log('Recent date', recent)
            console.log('Due date', due)
            if(recent == due){
                $scope.alerts.push({msg: '' + discription + ' is due for car ' + reg + ' today', type: 'danger'});

            }
            else if(due < recent){
                $scope.alerts.push({msg: '' + discription + ' is Overdue for car ' + reg , type: 'success'});

            }


        };

        MeService.get(function (user) {
            $scope.user = user;
            $scope.pending = false
            $scope.getCars()
        }, function(data) {
            alert('Not authorized')
            $location.path('/')
        });

        $scope.logout = function () {
            loginService.logout();
            $location.path('/');
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

        $scope.getCars = function () {
            CarsService.get(function (data) {
                angular.forEach(data, function (cars) {
                    var total=0;
                    var count = 0;
                    angular.forEach(cars, function (value) {
                        value.car.reminders = [];
                        $scope.gauge_data = [];
                        $scope.cars.push(value.car)
                        RemindersService.get(value.car.id,function (data) {
                            angular.forEach(data, function (reminders, index) {
                                angular.forEach(reminders, function(reminder, index) {
                                    value.car.reminders.push(reminder.reminder);
                                    $scope.differenceInDays(reminder.reminder.date,reminder.reminder.description,value.car.registration)
                                })
                            });
                            console.log('car', value.car);
                        });
                        FuelService.get(value.car.id,function (data) {
                            angular.forEach(data, function (fuel_entries, index) {
                                angular.forEach(fuel_entries, function(value, index) {
                                    total += value.fuel_entry.liters;
                                    count = count + 1;
                                })
                            });
                            if(count == 0){
                                count = count + 1;
                            }
                        });
                    })
//                    $scope.gauge_data.push(
//                        {label: "Fuel", value:(total/count).toFixed(2), color: "#5398f1", suffix: "L"}
//                    )
                });
            });
        };


    }]);