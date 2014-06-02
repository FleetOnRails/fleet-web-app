/**
 * Created by krystian on 06/03/2014.
 */
angular.module('fleetonrails.services.gps-service', [])

    .factory('GpsService', [ '$http', 'globalSettings', function ($http, globalSettings) {
        return {
            get: function (id,success) {
                $http({

                    method: 'GET',
                    url: globalSettings.api_base_url + '/v1/cars/' + id + '/gps_statistics',
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
            }
        }
    }]);
