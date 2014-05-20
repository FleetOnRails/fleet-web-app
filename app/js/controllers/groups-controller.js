angular.module('fleetonrails.controllers.groups-controller', [])

    .controller('GroupsCtrl', [ '$scope', 'MeService', '$location', 'loginService','GroupsService',
        function ($scope, MeService,$location, loginService,GroupsService) {

            $scope.alerts = [];


            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };


            $scope.addGroup = function(){
               var attributes = {
                   group: {
                       name: $scope.group.name,
                       location_attributes:{
                           address: $scope.group.location_attributes.address
                       }
                   }
               };
               GroupsService.create(attributes,function(groups){
                   console.log(groups)
                   $location.path('/groups')
               },function(data){
                   console.log(data)
               })
           }

            $scope.add = function(){
                var attributes = {
                    group: {
                        name: $scope.group.name,
                        location_attributes:{
                            address: $scope.group.location_attributes.address
                        }
                    }
                };
                GroupsService.create(attributes,function(groups){
                    $scope.refreshGroups()
                    $scope.alerts.push({msg: 'Group successfully added', type: 'success'});
                },function(data){
                    console.log(data)
                })
            }

            $scope.CollapseDemoCtrl = function(){
                $scope.isCollapsed = true;
            }

            GroupsService.get(function(groups){
                $scope.groups = []
                angular.forEach(groups, function (groups, index) {
                    angular.forEach(groups, function(value, index) {
                        $scope.groups.push(value.group)
                        console.log(value.group)
                    })
                });
            })

            $scope.refreshGroups = function(){
                GroupsService.get(function(groups){
                    $scope.groups = []
                    angular.forEach(groups, function (groups, index) {
                        angular.forEach(groups, function(value, index) {
                            $scope.groups.push(value.group)
                            console.log(value.group)
                        })
                    });
                })
            }

            $scope.changeToAdd = function(){
                $location.path('/addgroup')
            };


            $scope.deleteGroup = function(id,index){
                GroupsService.delete(id,function(){
                    $scope.alerts.push({msg: 'Group successfully deleted! ', type: 'success'});
                    $scope.groups.splice(index, 1);
                })
            }


            MeService.get(function (user) {
                $scope.user = user;
            }, function(data) {
                alert('Not authorized')
                $location.path('/')
            });




        }]);