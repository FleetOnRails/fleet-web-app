angular.module('fleetonrails.controllers.car_edit-controller', [])

    .controller('carEditController', ['$scope', 'CarsService', '$location', '$timeout', '$interval', 'MeService','$routeParams',
        function ($scope, CarsService, $location, $timeout, $interval,MeService, $routeParams) {

            $scope.personalNav= true;
            $scope.groupNav = false;


            $scope.getCar = function (id) {
                CarsService.show(id, function (data) {
                    $scope.car = data['car'];
                });
            };


            $scope.updateCar = function () {
                var attributes = {
                    car: {
                        make: $scope.car.make,
                        model: $scope.car.model,
                        registration: $scope.car.registration
                    }
                };

                CarsService.change($routeParams.id, attributes, function (car) {
                    console.log(car);
                    $location.path('/car/' + $routeParams.id)
                })
            };

            if ($routeParams && $routeParams.id) {
                $scope.getCar($routeParams.id)
            } else {
            }

            MeService.get(function (user) {
                $scope.user = user;
            }, function(data) {
                alert('Not authorized')
                $location.path('/')
            });

        }]);