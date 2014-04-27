angular.module('fleetonrails.controllers.groups_destinations-controller', [])

    .controller('GroupsDestCtrl', [ '$scope', 'MeService', '$location', '$routeParams','loginService','GroupsService',
        function ($scope, MeService,$location,$routeParams,loginService,GroupsService) {

            $scope.alerts =[]

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
        }]);