angular.module('fleetonrails.controllers.group_car_edit-controller', [])

    .controller('groupCarEditCtrl', ['$scope', 'GroupsCarsService', '$location', '$timeout', '$interval', 'MeService','$routeParams','GroupsService',
        function ($scope, GroupsCarsService, $location, $timeout, $interval,MeService, $routeParams,GroupsService) {


            $scope.personalNav= false;
            $scope.groupNav = true;

            $scope.getGroup = function(id){
                GroupsService.show(id,function(data){
                    console.log('Group ' ,data)
                    $scope.group = data['group'];
                })
            }


            $scope.getCar = function (id) {
                GroupsCarsService.show(id, $routeParams.car_id,function (data) {
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
                console.log(attributes)
                GroupsCarsService.update($routeParams.id,$routeParams.car_id, attributes, function (car) {
                    console.log(car);
                })
            };

            if ($routeParams && $routeParams.id) {
                $scope.getCar($routeParams.id);
                $scope.getGroup($routeParams.id)
            }

            MeService.get(function (user) {
                $scope.user = user;
            }, function(data) {
                alert('Not authorized')
                $location.path('/')
            });

        }]);