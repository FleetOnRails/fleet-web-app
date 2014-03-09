angular.module('fleetonrails.controllers.car-controller', [])

    .controller('carController', ['$scope', 'CarsService', '$location', function ($scope, CarsService, $location) {
        $scope.cars = [];

        CarsService.get(function (data) {
            angular.forEach(data, function (cars, index) {
                angular.forEach(cars, function(value, index) {
                    $scope.cars.push(value.car)
                })
            });
        });

        $scope.addCar = function () {
            var attributes = {
                car: {
                    make: $scope.car.make,
                    model: $scope.car.model,
                    registration: $scope.car.registration
                }
            };
            console.log(attributes);
            CarsService.create(attributes, function (car) {
                console.log(car);
            })
        };
    }]);