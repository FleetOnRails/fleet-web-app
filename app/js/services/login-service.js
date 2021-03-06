angular.module('fleetonrails.services.login-service', [])

    .service('loginService', ['$http', 'globalSettings', function ($http, globalSettings) {
        var loginWithPassword = function (email, password) {

            var params = {
                'grant_type' : 'password',
                'client_id' : globalSettings.api_client_id,
                'client_secret' : globalSettings.api_client_secret,
                'email' : email,
                'password' : password
            };
            return $http({
                method : 'POST',
                url : globalSettings.api_base_url + '/oauth/token',
//                TODO change to data
                params : params
            })
        };

        var loginWithRefreshToken = function () {
            var params = {
                'grant_type' : 'refresh_token',
                'client_id' : globalSettings.api_client_id,
                'client_secret' : globalSettings.api_client_secret,
                'refresh_token' : localStorage.getItem("refresh_token")
            };
            return $http({
                method : "POST",
                url : globalSettings.api_base_url + '/oauth/token',
                params : params
            })
        };

        var logout = function () {
            localStorage.setItem('access_token', '');
            localStorage.setItem('refresh_token', '');
            localStorage.clear()
            console.log(localStorage)
        }

        return {
            loginWithPassword : loginWithPassword,
            loginWithRefreshToken : loginWithRefreshToken,
            logout : logout
        };

    }]);