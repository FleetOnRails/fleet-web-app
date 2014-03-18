/**
 * Created by krystian on 06/03/2014.
 */
angular.module('fleetonrails.services.fuel-service', [])

    .factory('FuelService', [ '$http', 'globalSettings', function ($http, globalSettings) {
        return {
            get: function (id,success) {
                $http({
                    method: 'GET',
                    url: globalSettings.api_base_url + '/v1/cars/'+ id + '/fuel_entries',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (fuel_entries) {
                        console.log('success', fuel_entries);
                        success(fuel_entries);
                    }).error(function (data) {
                        console.log(data);
                    })
            },
            create: function (id,attributes, success) {
                $http({
                    method: 'POST',
                    url: globalSettings.api_base_url + '/v1/cars/' + id + '/fuel_entries',
                    data: attributes,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (fuel_entries) {
                        console.log('after succes')
                        console.log(fuel_entries);
                        success(fuel_entries);
                    }).error(function (data) {
                        console.log(data);
                    })
            },
            delete: function(id,fuel_id,succes){
                console.log(globalSettings.api_base_url);
                $http({
                    method: 'DELETE',
                    url: globalSettings.api_base_url + '/v1/cars/' + id + '/fuel_entries/' + fuel_id,
                    headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }

                }).success(function(fuel_entries){
                        succes(fuel_entries);
                    })
                    .error(function(data){
                        console.log(data);
                    })
            }
        }
    }]);
