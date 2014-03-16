/**
 * Created by krystian on 06/03/2014.
 */
angular.module('fleetonrails.services.fuel-service', [])

    .factory('FuelService', [ '$http', 'globalSettings', function ($http, globalSettings) {
        return {
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
                }).success(function (user) {
                        success(user);
                    }).error(function (data) {
                        console.log(data);
                    })
            }
        }
    }]);
