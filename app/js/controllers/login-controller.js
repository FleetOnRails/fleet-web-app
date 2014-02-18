angular.module('fleetonrails.controllers.login-controller', [])

    .controller('loginController', ['$scope', 'loginService', function ($scope, loginService) {
        $scope.login = function () {
            loginService.loginWithPassword($scope.user.email, $scope.user.password)
                .success(function (data, status) {
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("refresh_token", data.refresh_token);
                    console.log("access_token", localStorage.getItem("access_token"));
                    console.log("refresh_token", localStorage.getItem("refresh_token"));
                }).error(function (data, status) {
                    console.log('fail', data, status)
                });
        }
    }]);
