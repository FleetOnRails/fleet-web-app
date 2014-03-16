angular.module('fleetonrails.controllers.car-controller', [])

    .controller('carController', ['$scope', 'CarsService', '$location', '$routeParams', function ($scope, CarsService, $location, $routeParams) {
        $scope.cars = [];
        var lat = null
        var long = null

        console.log('Before markers lati is ' + lat + ' long is ' + long)
        $scope.myMarkers = [
            {
                "latitude":lat,
                "longitude":long
            }
        ];

        $scope.center = {
            latitude: lat,
            longitude: long
        };

        $scope.zoom = 13;
        $scope.markers = $scope.myMarkers;
        $scope.fit = true;

       $scope.getCars = function() {
           CarsService.get(function (data) {
                angular.forEach(data, function (cars, index) {
                    angular.forEach(cars, function(value, index) {
                        $scope.cars.push(value.car)
                    })
                });
           });
       };

        $scope.getCar = function(id) {
            CarsService.show(id, function (data) {
                $scope.car = data['car'];
                lat = $scope.car.current_gps_statistic.location.latitude
                console.log(lat)
                long = $scope.car.current_gps_statistic.location.longitude
                console.log(long)
            });
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

        $scope.updateCar = function(){
            var attributes = {
                car :{
                    make:$scope.car.make,
                    model:$scope.car.model,
                    registration: $scope.car.registration
                }
            };

            CarsService.change($routeParams.id, attributes,function(car){
                console.log(car);
            })
        };

        $scope.deleteCar = function(id){
            var attributes = id

            CarsService.delete($routeParams.id, attributes,function(car){
                console.log(car);
                $scope.cars.splice($scope.cars.indexOf(id),1);
            })
        };

        if ($routeParams && $routeParams.id) {
            $scope.getCar($routeParams.id)
        } else {
            $scope.getCars();
        }


    }]);