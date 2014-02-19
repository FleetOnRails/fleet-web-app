angular.module('fleetonrails.services.me-service', [])

    .factory('MeService', [ '$http', 'globalSettings', function($http, globalSettings) {
        return {
            get: function(success) {
                $http({
                    method: 'GET',
                    url: globalSettings.api_base_url + '/v1/me',
                    params: {
                        access_token: localStorage.getItem('access_token')
                    }
                }).success(function(user) {
                    success(user);
                    }).error(function(data) {
                        console.log(data);
                    })
            },
            change: function(attributes, success) {
                $http({
                    method: 'PUT',
                    url: globalSettings.api_base_url + '/v1/me',
                    params: {
                        access_token: localStorage.getItem('access_token')
                    }
                }).success(function(user) {
                        success(user);
                    }).error(function(data) {
                        console.log(data);
                    })
            }
        }
    }]);