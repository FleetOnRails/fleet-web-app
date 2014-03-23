/**
 * Created by krystian on 23/03/2014.
 */
angular.module('fleetonrails.controllers.users-controller', [])

    .controller('usersController', ['$scope', 'UsersService', '$location', function ($scope, UsersService, $location) {
        $scope.registerUser = function () {
            var attributes = {
                user: {
                    first_name: $scope.user.name,
                    last_name: $scope.user.surname,
                    email : $scope.user.email,
                    username : $scope.user.username,
                    password : $scope.user.password,
                    password_confirmation : $scope.password_confirmation
                }
            };
            UsersService.create(attributes, function(user){
                console.log( user)
            })

        }
    }]);
