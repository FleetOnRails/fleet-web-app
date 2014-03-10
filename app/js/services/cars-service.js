/**
 * Created by krystian on 06/03/2014.
 */
angular.module('fleetonrails.services.cars-service', [])

    .factory('CarsService', [ '$http', 'globalSettings', function ($http, globalSettings) {
        return {
            get: function (success) {
                $http({
                    method: 'GET',
                    url: globalSettings.api_base_url + '/v1/cars',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (cars) {
                        console.log('success', cars);
                        success(cars);
                    }).error(function (data) {
                        console.log(data);
                    })
            },

            show: function (id, success) {
                $http({
                    method: 'GET',
                    url: globalSettings.api_base_url + '/v1/cars/' + id,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (car) {
                        console.log('success', car);
                        success(car);
                    }).error(function (data) {
                        console.log(data);
                    })
            },

            create: function (attributes, success) {
                $http({
                    method: 'POST',
                    url: globalSettings.api_base_url + '/v1/cars',
                    data: attributes,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (user) {
                        success(user);
                    }).error(function (data) {
                        console.log(data);
                    })
            },

            change: function(id, attributes,succes){
                console.log(globalSettings.api_base_url);
                $http({
                    method: 'PUT',
                    url: globalSettings.api_base_url + '/v1/cars/' + id,
                    data: attributes,
                    headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }

                }).success(function(cars){
                    succes(cars);
                })
                    .error(function(cars){
                        console.log(cars);
                    })
            },
            delete: function(id, attributes,succes){
                console.log(globalSettings.api_base_url);
                $http({
                    method: 'DELETE',
                    url: globalSettings.api_base_url + '/v1/cars/' + id,
                    headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }

                }).success(function(cars){
                        succes(cars);
                    })
                    .error(function(cars){
                        console.log(cars);
                    })
            }
        }
    }]);
