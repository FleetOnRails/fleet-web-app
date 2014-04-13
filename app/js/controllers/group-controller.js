angular.module('fleetonrails.controllers.group-controller', [])

    .controller('GroupCtrl', [ '$scope', 'MeService', '$location', '$routeParams','loginService','GroupsService',
        function ($scope, MeService,$location,$routeParams, loginService,GroupsService) {


            $scope.getGroup = function(id){
                GroupsService.show(id,function(group){
                    console.log(group)
                })
            }

            if ($routeParams && $routeParams.id) {
                $scope.getGroup($routeParams.id)

            }

        }]);