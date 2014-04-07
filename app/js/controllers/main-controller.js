angular.module('fleetonrails.controllers.main-controller', [])

    .controller('MainCtrl', [ '$scope', 'MeService', 'CarsService','RemindersService','$location', 'loginService', function ($scope, MeService, CarsService,RemindersService,$location, loginService) {

        var attributes = []

        $scope.cars = [];
        $scope.reminders = [];


        $scope.pending = true

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
                    angular.forEach(cars, function (value) {
                        value.car.reminders = [];
                        $scope.cars.push(value.car)
                        RemindersService.get(value.car.id,function (data) {
                            angular.forEach(data, function (reminders, index) {
                                angular.forEach(reminders, function(reminder, index) {
                                    value.car.reminders.push(reminder.reminder);
                                })
                            });
                            console.log('car', value.car);
                        });
                    })
                });
            });
        };


    }]);