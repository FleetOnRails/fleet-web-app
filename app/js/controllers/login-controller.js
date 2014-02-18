angular.module('fleetonrails.controllers.login-controller', [])

    .controller('LoginController', ['$scope', 'LoginService', function ($scope, LoginService) {
        $scope.login = function () {
            LoginService.loginWithPassword($scope.user.email, $scope.user.password)
                .success(function (data, status) {
                    console.log('success', data, status)
                }).error(function (data, status) {
                    console.log('fail', data, status)
                });
        }
    }]);
