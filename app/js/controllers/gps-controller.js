angular.module('fleetonrails.controllers.gps-controller', [])

    .controller('gpsController', ['$scope', 'GpsService', 'CarsService', '$location', '$routeParams', function ($scope, GpsService, CarsService, $location, $routeParams) {
//        var my_car_ids = [];
//        var my_locations = [];
//
//        $scope.getCars = function () {
//            CarsService.get(function (data) {
//                angular.forEach(data, function (cars, index) {
//                    angular.forEach(cars, function (value, index) {
//                        my_car_ids.push(value.car)
//                    })
//                });
//            });
//        };
//
//        console.log(my_cars);
//
//        angular.forEach(my_car_ids, function (id, index) {
//            GpsService.get(function () {
//                my_locations.push()
//            })
//        })


        $scope.map = {
            center: {
                latitude: 53.34991410000001,
                longitude: -6.260663699999999
            },
            zoom: 8
        };

    }]);