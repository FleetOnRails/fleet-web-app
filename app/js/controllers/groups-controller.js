angular.module('fleetonrails.controllers.groups-controller', [])

    .controller('GroupsCtrl', [ '$scope', 'MeService', '$location', 'loginService','GroupsService',
        function ($scope, MeService,$location, loginService,GroupsService) {

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
               },function(data){
                   console.log(data)
               })
           }

            getGroups = function(){
                GroupsService.get(function(groups){
                    console.log('gorups',groups)
                })
            }




        }]);