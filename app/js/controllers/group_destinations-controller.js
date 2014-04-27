angular.module('fleetonrails.controllers.groups_destinations-controller', [])

    .controller('GroupsDestCtrl', [ '$scope', 'MeService', '$location', '$routeParams','loginService','GroupsService','GroupsDestinationsService',
        function ($scope, MeService,$location,$routeParams,loginService,GroupsService,GroupsDestinationsService) {

            $scope.alerts =[]
            $scope.destinations = []

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

            $scope.getGroup = function(id){
                GroupsService.show(id,function(data){
                    $scope.group = data['group'];
                })
            }

            if ($routeParams && $routeParams.id) {
                $scope.getGroup($routeParams.id)
            }

            $scope.addDestination = function(){
                var attributes = {
                    destination : {
                        name : $scope.destination.name,
                        location_attributes:{
                            address : $scope.destination.address
                        }
                    }
                }
                GroupsDestinationsService.create($routeParams.id,attributes,function(destination){
                    $scope.alerts.push({msg: 'Destination added to group successfully', type: 'success'});
                    $scope.getDestinations()
                })
            }

            $scope.deleteDestination = function(destination_id,id){
                GroupsDestinationsService.delete($routeParams.id,destination_id,function(destination){
                    console.log('delete vendor', destination)
                    $scope.alerts.push({msg:'Destination successfully delete from group', type:'success'});
                    $scope.destinations.splice(id, 1);
                },function(data){
                    console.log(data)
                })
            }

            $scope.getDestinations= function(){
                GroupsDestinationsService.get($routeParams.id,function(data){
                    $scope.destinations = [];
                    angular.forEach(data, function (destinations) {
                        angular.forEach(destinations, function(value) {
                            $scope.destinations.push(value.destination)
                        })
                    });
                })
            }

            if($routeParams && $routeParams.id){
                $scope.getDestinations()
            }
        }]);