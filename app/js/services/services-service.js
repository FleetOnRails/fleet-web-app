/**
 * Created by krystian on 23/03/2014.
 */
angular.module('fleetonrails.services.services-service', [])

    .factory('ServicesService', [ '$http', 'globalSettings', function ($http, globalSettings) {
        return {
            get: function (id,success) {
                $http({
                    method: 'GET',
                    url: globalSettings.api_base_url + '/v1/cars/'+ id + '/service_records',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (service_records) {
                        console.log('success', service_records);
                        success(service_records);
                    }).error(function (data) {
                        console.log(data);
                    })
            },
            create: function (id,attributes, success) {
                $http({
                    method: 'POST',
                    url: globalSettings.api_base_url + '/v1/cars/' + id + '/service_records',
                    data: attributes,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (service_record) {
                        success(service_record);
                    }).error(function (data) {
                        console.log(data);
                    })
            }
        }
    }]);
