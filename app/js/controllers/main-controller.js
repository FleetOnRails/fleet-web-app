angular.module('fleetonrails.controllers.main-controller', [])

    .controller('MainCtrl', [ '$scope', 'MeService', 'CarsService', '$location', 'loginService', function ($scope, MeService, CarsService, $location, loginService) {
        $scope.cars = [];

        MeService.get(function (user) {
            $scope.user = user;
        });

        CarsService.get(function (data) {
            angular.forEach(data, function (cars, index) {
                angular.forEach(cars, function(value, index) {
                    $scope.cars.push(value.car)
                })
            });
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
//            TODO - Remove
            console.log(attributes);
            MeService.change(attributes, function (user) {
                console.log(user);
            })
        };

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

        $scope.map = {
            center: {
                latitude: 53.34991410000001,
                longitude: -6.260663699999999
            },
            zoom: 8
        };
    }]);