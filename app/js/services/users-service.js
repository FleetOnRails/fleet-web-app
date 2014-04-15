/**
 * Created by krystian on 23/03/2014.
 */
angular.module('fleetonrails.services.users-service', [])

    .service('UsersService', ['$http', 'globalSettings', function ($http, globalSettings) {
        return{
            get: function (success) {
                $http({
                    method: 'GET',
                    url: globalSettings.api_base_url + '/v1/users',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (users) {
                        console.log('success', users);
                        success(users);
                    }).error(function (data) {
                        console.log(data);
                    })
            },

            create: function(data, success) {
                $http({
                    method: 'POST',
                    url: globalSettings.api_base_url + '/v1/users',
                    data: data,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (user) {
                        success(user);
                    }).error(function (data) {
                        console.log(data);
                    })
            }
        }
    }]);
