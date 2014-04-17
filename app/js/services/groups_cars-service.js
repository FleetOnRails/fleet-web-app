angular.module('fleetonrails.services.groups_cars-service', [])

    .factory('GroupsCarsService', [ '$http', 'globalSettings', function($http, globalSettings) {
        return {
            get: function(id,success, error) {
                $http({
                    method: 'GET',
                    url: globalSettings.api_base_url + '/v1/groups/' + id + '/cars',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function(cars){
                        console.log(cars)
                        success(cars);
                    }).error(function(cars) {
                        error(cars)
                        console.log(cars);
                    })
            },

            create: function(id,data, success, error) {
                $http({
                    method: 'POST',
                    url: globalSettings.api_base_url + '/v1/groups/' + id + '/cars',
                    data: data,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function(cars) {
                        success(cars);
                    }).error(function(cars) {
                        error(cars)
                        console.log(cars);
                    })
            },
            delete: function(id,carID, success, error) {
                $http({
                    method: 'DELETE',
                    url: globalSettings.api_base_url + '/v1/groups/' + id + '/cars/' + carID,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function(cars) {
                        success(cars);
                    }).error(function(cars) {
                        error(cars);
                        console.log(cars);
                    })
            }
        }
    }]);