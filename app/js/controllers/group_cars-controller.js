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
            };

            $scope.changeToAddCar = function(){
                $location.path('/group/' + $routeParams.id + '/add_car')

            };

            $scope.deleteCar = function(car_id,id){
                GroupsCarsService.delete($routeParams.id,car_id,function(cars){
                    $scope.alerts.push({msg:'Car deleted!', type:'success'})
                    $scope.cars.splice(id, 1);

                },function(data){
                    console.log(data)
                })
            }

            $scope.addCar = function () {
                GroupsCarsService.create($routeParams.id,{car: $scope.car}, function (car) {
                    $location.path('/group/' + $routeParams.id + '/cars')
                })

            };

            if ($routeParams && $routeParams.id) {
                $scope.getGroup($routeParams.id)
                $scope.getCars($routeParams.id)

            }

        }]);