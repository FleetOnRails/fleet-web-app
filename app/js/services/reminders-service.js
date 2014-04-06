/**
 * Created by krystian on 23/03/2014.
 */
angular.module('fleetonrails.services.reminders-service', [])

    .factory('RemindersService', [ '$http', 'globalSettings', function ($http, globalSettings) {
        return {
            get: function (id,success) {
                $http({
                    method: 'GET',
                    url: globalSettings.api_base_url + '/v1/cars/'+ id + '/reminders',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (reminders) {
                        console.log('success', reminders);
                        success(reminders);
                    }).error(function (data) {
                        console.log(data);
                    })
            },
            create: function (id,attributes, success) {
                $http({
                    method: 'POST',
                    url: globalSettings.api_base_url + '/v1/cars/' + id + '/reminders',
                    data: attributes,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (reminders) {
                        success(reminders);
                    }).error(function (data) {
                        console.log(data);
                    })
            }
        }
    }]);
