angular.module('fleetonrails.services.login-service', [])

    .service('LoginService', ['$http', 'GlobalSettings', function ($http, GlobalSettings) {
        var loginWithPassword = function (email, password) {
            var params = {
                'grant_type' : 'password',
                'client_id' : GlobalSettings.api_client_id,
                'client_secret' : GlobalSettings.api_client_secret,
                'email' : email,
                'password' : password
            };
            return $http({
                method : 'POST',
                url : GlobalSettings.api_base_url + '/oauth/token',
                params : params
            })
        };

        var loginWithRefreshToken = function () {
            var params = {
                'grant_type' : 'refresh_token',
                'client_id' : GlobalSettings.api_client_id,
                'client_secret' : GlobalSettings.api_client_secret,
                'refresh_token' : localStorage.getItem("refresh_token")
            };
            return $http({
                method : "POST",
                url : GlobalSettings.api_base_url + '/oauth/token',
                params : params
            })
        };

        var logout = function () {
//            TODO = implement a logout function
        }

        return {
            loginWithPassword : loginWithPassword,
            loginWithRefreshToken : loginWithRefreshToken,
            logout : logout
        };

    }]);