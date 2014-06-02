angular.module('fleetonrails.services.groups_destinations-service', [])

    .factory('GroupsDestinationsService', [ '$http', 'globalSettings', function($http, globalSettings) {
        return {
            get: function(id,success, error) {
                $http({
                    method: 'GET',
                    url: globalSettings.api_base_url + '/v1/groups/' + id + '/destinations',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function(destinations){
                        success(destinations);
                    }).error(function(destinations) {
                        error(destinations)
                        console.log(destinations);
                    })
            },

            create: function(id,data, success, error) {
                $http({
                    method: 'POST',
                    url: globalSettings.api_base_url + '/v1/groups/' + id + '/destinations',
                    data: data,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function(destinations) {
                        success(destinations);
                    }).error(function(destinations) {
                        error(destinations)
                        console.log(destinations);
                    })
            },
            delete: function(id,destinationsID, success, error) {
                $http({
                    method: 'DELETE',
                    url: globalSettings.api_base_url + '/v1/groups/' + id + '/destinations/' + destinationsID,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function(destinations) {
                        success(destinations);
                    }).error(function(destinations) {
                        error(destinations);
                        console.log('Error',destinations);
                    })
            }
        }
    }]);