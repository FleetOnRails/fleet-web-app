angular.module('fleetonrails.directives', [])

    .directive('navbar',function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/navbar.html',
            controller: function($scope,MeService,$location,loginService){
                MeService.get(function (user) {
                    $scope.user = user;
                }, function(data) {
                    alert('Not authorized')
                    $location.path('/')
                });

                $scope.logout = function () {
                    loginService.logout();
                    $location.path('/');
                };
            }
        }
    });