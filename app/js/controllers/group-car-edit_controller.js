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
                GroupsCarsService.update($routeParams.id,$routeParams.car_id, {car: $scope.car}, function (car) {
                    $location.path('/group/'+$routeParams.id + '/car/' + $routeParams.car_id )
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