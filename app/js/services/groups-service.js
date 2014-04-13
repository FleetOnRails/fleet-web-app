angular.module('fleetonrails.services.groups-service', [])

    .factory('GroupsService', [ '$http', 'globalSettings', function($http, globalSettings) {
        return {
            get: function(success, error) {
                $http({
                    method: 'GET',
                    url: globalSettings.api_base_url + '/v1/groups',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function(groups){
                        success(groups);
                    }).error(function(groups) {
                        error(groups)
                        console.log(groups);
                    })
            },

            create: function(data, success, error) {
                $http({
                    method: 'POST',
                    url: globalSettings.api_base_url + '/v1/groups',
                    data: data,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function(groups) {
                        success(groups);
                    }).error(function(groups) {
                        error(groups)
                        console.log(groups);
                    })
            },
            delete: function(id,success, error) {
                $http({
                    method: 'DELETE',
                    url: globalSettings.api_base_url + '/v1/groups/' + id,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function(groups) {
                        success(groups);
                    }).error(function(groups) {
                        error(groups);
                        console.log(groups);
                    })
            }
        }
    }]);