angular.module('fleetonrails.controllers.main-controller', [])

    .controller('MainCtrl', [ '$scope', 'MeService', '$location', 'loginService', function ($scope, MeService, $location, loginService) {

        MeService.get(function (user) {
            $scope.user = user;
        });

        $scope.logout = function () {
            loginService.logout();
            $location.path('/');
        };

        $scope.changeProfile = function () {
            var attributes = {};
            angular.forEach($scope.user.me, function (value, key) {
                console.log(key + ' : ' + value);
                attributes[key] = value;
            });
            MeService.change(attributes, function (user) {
                console.log(user);
            })
        };
    }]);