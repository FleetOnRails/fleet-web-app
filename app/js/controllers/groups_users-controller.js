angular.module('fleetonrails.controllers.groups_users-controller', [])

    .controller('GroupsUsersCtrl', [ '$scope', 'MeService', '$location', '$routeParams','loginService','GroupsUsersService',
        function ($scope, MeService,$location,$routeParams, loginService,GroupsUsersService) {

            $scope.getGroupUsers = function(id){
                GroupsUsersService.get(id,function(data){
                    $scope.users = [];
                    angular.forEach(data, function (users, index) {
                        angular.forEach(users, function(value, index) {
                            $scope.users.push(value.user)
                            console.log(value.user)
                        })
                    });
                })
            }
            //TODO ADD user

            if ($routeParams && $routeParams.id) {
                $scope.getGroupUsers($routeParams.id)

            }

        }]);