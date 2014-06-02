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
                CarsService.change($routeParams.id, {car: $scope.car}, function (car) {
                    console.log(car);
                    $location.path('/car/' + $routeParams.id)
                })
            };

            if ($routeParams && $routeParams.id) {
                $scope.getCar($routeParams.id)
            }


        }]);