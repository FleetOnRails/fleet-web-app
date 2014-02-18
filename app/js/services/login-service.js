angular.module('fleetonrails.services.login-service', [])

    .service('LoginService', ['$http', function ($http) {
        var loginWithPassword = function (email, password) {
            var params = {
                'grant_type': 'password',
                'client_id': '2abe8af97a1e45ee655b5f19d9fb4977990374c2a2895b4aaa6a9d80aa7edeeb',
                'client_secret': '33d91b9efcea015b8acaff960ae49164c15da62ff895a253bbfd819b883ba5f6',
                'email': email,
                'password': password
            };
            return $http({
                method: 'POST',
                url: 'http://fleet-api.raven.com/oauth/token',
                params: params
            })
        };

        var loginWithRefreshToken = function () {
            var params = {
                'grant_type': 'refresh_token',
                'client_id': '2abe8af97a1e45ee655b5f19d9fb4977990374c2a2895b4aaa6a9d80aa7edeeb',
                'client_secret': '33d91b9efcea015b8acaff960ae49164c15da62ff895a253bbfd819b883ba5f6',
                'refresh_token': localStorage.getItem("refresh_token")
            };
            return $http({
                method: "POST",
                url: 'http://fleet-api.raven.com/oauth/token',
                params: params
            })
        };

        return {
            loginWithPassword: loginWithPassword,
            loginWithRefreshToken: loginWithRefreshToken
        };

    }]);