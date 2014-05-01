angular.module('fleetonrails.directives', [])

    .directive('navbar',function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/navbar.html',
            controller: function($scope,MeService,$location,loginService){
                MeService.get(function (user) {
                    $scope.user = user;
                    console.log('Inside directive ctrl for me ', user.me.first_name)
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