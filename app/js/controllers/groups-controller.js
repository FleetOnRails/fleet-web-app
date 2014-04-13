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

            GroupsService.get(function(groups){
                $scope.groups = []
                angular.forEach(groups, function (groups, index) {
                    angular.forEach(groups, function(value, index) {
                        $scope.groups.push(value.group)
                        console.log(value.group)
                    })
                });
            })





        }]);