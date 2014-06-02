angular.module('fleetonrails.controllers.groups_users-controller', [])

    .controller('GroupsUsersCtrl', [ '$scope', 'MeService', '$location', '$routeParams','loginService',
        'GroupsUsersService','UsersService','GroupsService', '$timeout',
        function ($scope, MeService,$location,$routeParams, loginService,GroupsUsersService,UsersService,GroupsService,$timeout) {

            $scope.form={};
            $scope.alerts = [];

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

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

            $scope.getGroupUsers = function(id){
                GroupsUsersService.get(id,function(data){
                    $scope.users = [];
                    angular.forEach(data, function (users, index) {
                        angular.forEach(users, function(value, index) {
                            $scope.users.push(value.user)
                        })
                    });
                })
            }

            $scope.addUserToGroup = function(){
                var attributes = {
                    user: {
                        group_access:$scope.perForm.product.id
                    }
                };
                var user_id = $scope.form.user.id
                console.log(attributes)
                GroupsUsersService.create($routeParams.id,user_id,attributes,function(user){
                    $scope.alerts.push({msg: 'User added to group successfully', type: 'success'});
                    $scope.perForm.product = [];
                    $scope.form.user = [];
                    $scope.getGroupUsers($routeParams.id);
                    $scope.removeAlerts();
                },function(error){
                    console.log('error',error)
                })
            }

            $scope.deleteUser = function( user_id,id){
                GroupsUsersService.delete($routeParams.id,user_id ,function(users){
                    console.log(users)
                    $scope.alerts = [];
                    $scope.alerts.push({msg: 'User successfully deleted from group! ', type: 'success'});
                    $scope.users.splice(id, 1);
                    $scope.removeAlerts();
                })
            };

            $scope.removeAlerts = function () {
                $timeout(function () {
                    $scope.alerts = [];
                }, 4000);
            };

            $scope.getSystemUsers = function(){
                $scope.systemUsers = [];
                UsersService.get(function(data){
                    $scope.systemUsers = [];
                    angular.forEach(data, function (users, index) {
                        angular.forEach(users, function(value, index) {
                            $scope.systemUsers.push(value.user)
                        })
                    });
                })
            }

            $scope.getGroup = function(id){
                GroupsService.show(id,function(data){
                    $scope.group = data['group'];
                })
            }

            if ($routeParams && $routeParams.id) {
                $scope.getGroupUsers($routeParams.id)
                $scope.getGroup($routeParams.id)
                $scope.getSystemUsers()

            }

        }]);