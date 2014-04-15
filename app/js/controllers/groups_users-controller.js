angular.module('fleetonrails.controllers.groups_users-controller', [])

    .controller('GroupsUsersCtrl', [ '$scope', 'MeService', '$location', '$routeParams','loginService','GroupsUsersService','UsersService',
        function ($scope, MeService,$location,$routeParams, loginService,GroupsUsersService,UsersService) {

            $scope.form={};

            $scope.p = {};
            $scope.perForm = {};

            $scope.systemUsers = [];

            $scope.p.options = [{
                "id": 40,
                "name": "Manager"
            }, {
                "id": 20,
                "name": "Driver"
            }, {
                "id": 30,
                "name": "Owner"
            },{
                "id": 10,
                "name": "Reporter"
            }];

            $scope.getGroupUsers = function(id){
                GroupsUsersService.get(id,function(data){
                    $scope.users = [];
                    angular.forEach(data, function (users, index) {
                        angular.forEach(users, function(value, index) {
                            $scope.users.push(value.user)
                            console.log('Group user',value.user)
                        })
                    });
                })
            }
            //TODO ADD user

            $scope.getSystemUsers = function(){
                UsersService.get(function(data){
                    $scope.systemUsers = [];
                    angular.forEach(data, function (users, index) {
                        angular.forEach(users, function(value, index) {
                            $scope.systemUsers.push(value.user)
                            console.log('System user',value.user)
                        })
                    });
                })
            }

            if ($routeParams && $routeParams.id) {
                $scope.getGroupUsers($routeParams.id)
                $scope.getSystemUsers()

            }

        }]);