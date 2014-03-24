angular.module('fleetonrails.controllers.main-controller', [])

    .controller('MainCtrl', [ '$scope', 'MeService', '$location', 'loginService', function ($scope, MeService, $location, loginService) {

        var attributes = []

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

        $scope.changePassword = function(){
          attributes = {
              me:{
              password: $scope.user.me.password,
              password_confirmation: $scope.user.me.password_confirmation,
              current_password : $scope.user.me.current_password
          }};
            console.log(attributes)
            MeService.changePassword(attributes,function(user){
                console.log(user)
            })
        };

    }]);