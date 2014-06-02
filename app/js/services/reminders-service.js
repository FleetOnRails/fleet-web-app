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
                        success(reminders);
                    }).error(function (data) {
                        console.log(data);
                    })
            },
            show: function (id,reminder_id,success) {
                $http({
                    method: 'GET',
                    url: globalSettings.api_base_url + '/v1/cars/'+ id + '/reminders/' + reminder_id,
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
            },
            update: function(id,reminder_id,data,success){
                $http({
                    method: 'PUT',
                    url: globalSettings.api_base_url + '/v1/cars/'+ id + '/reminders/' + reminder_id,
                    data: data,
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
            },
            delete: function(id,reminderID,succes){
                console.log(globalSettings.api_base_url);
                $http({
                    method: 'DELETE',
                    url: globalSettings.api_base_url + '/v1/cars/' + id + '/reminders/' + reminderID,
                    headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }

                }).success(function(reminders){
                        succes(reminders);
                    })
                    .error(function(reminders){
                        console.log(reminders);
                    })
            }
        }
    }]);
