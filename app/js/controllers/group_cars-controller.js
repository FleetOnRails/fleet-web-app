angular.module('fleetonrails.controllers.groups_cars-controller', [])

    .controller('GroupsCarsCtrl', [ '$scope', 'MeService', '$location', '$routeParams','GroupsCarsService','loginService','GroupsService',
        function ($scope, MeService,$location,$routeParams, GroupsCarsService,loginService,GroupsService) {


            $scope.cars=[];
            $scope.alerts =[];

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

            $scope.getGroup = function(id){
                GroupsService.show(id,function(data){
                    console.log(data)
                    $scope.group = data['group'];
                })
            }

            $scope.getCars = function(id){
                $scope.cars=[];
                GroupsCarsService.get(id,function(data){
                    angular.forEach(data, function (cars) {
                        angular.forEach(cars, function(value) {
                            $scope.cars.push(value.car)
                            console.log(value.car)
                        })
                    });
                })
            }

            $scope.addCar = function () {
                var attributes = {
                    car: {
                        make: $scope.car.make,
                        model: $scope.car.model,
                        registration: $scope.car.registration
                    }
                };
                console.log(attributes);
                GroupsCarsService.create($routeParams.id,attributes, function (car) {
                    $scope.alerts.push({msg: 'Car added to group successfully', type: 'success'});
                    $scope.getCars($routeParams.id)
                })

            };

            if ($routeParams && $routeParams.id) {
                $scope.getGroup($routeParams.id)
                $scope.getCars($routeParams.id)

            }

        }]);