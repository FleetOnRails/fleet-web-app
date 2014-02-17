'use strict';

angular.module('fleetonrails.controllers.login-controller', [])

    .controller('LoginCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.login = function() {
            //delete $httpProvider.defaults.headers.common['X-Requested-With'];
            var params = {
                'grant_type': 'password',
                'client_id': '2abe8af97a1e45ee655b5f19d9fb4977990374c2a2895b4aaa6a9d80aa7edeeb',
                'client_secret': '33d91b9efcea015b8acaff960ae49164c15da62ff895a253bbfd819b883ba5f6',
                'email': $scope.user.email,
                'password': $scope.user.password
            };
            $http({
                method: 'POST',
                url: 'http://fleet-api.raven.com/oauth/token',
                params: params,
                headers: {
                    'Host': 'localhost:63342',
                    'Origin': 'http://localhost:63342',
                    'X-Requested-With': null
                }
            }).success(function(data, status) {
                console.log('success', data, status)
            }).error(function(data, status) {
                console.log('fail', data, status)
            });
        }
    }])
