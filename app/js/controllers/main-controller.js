angular.module('fleetonrails.controllers.main-controller', [])

    .controller('MainCtrl', [ '$scope', 'MeService', '$location', 'loginService', function($scope, MeService, $location, loginService) {
        MeService.get(function(user) {
            $scope.user = user;
        });

        $scope.logout = function() {
            loginService.logout();
            $location.path('/');
        }
    }]);