/**
 * Created by krystian on 23/03/2014.
 */
angular.module('fleetonrails.services.services-service', [])

    .factory('ServicesService', [ '$http', 'globalSettings', function ($http, globalSettings) {
        return {
            get: function (id,success) {
                $http({
                    method: 'GET',
                    url: globalSettings.api_base_url + '/v1/cars/'+ id + '/expenses',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (expenses) {
                        console.log('success', expenses);
                        success(expenses);
                    }).error(function (data) {
                        console.log(data);
                    })
            },
            update: function (id,expense_id,attributes,success) {
                $http({
                    method: 'PUT',
                    url: globalSettings.api_base_url + '/v1/cars/'+ id + '/expenses/' + expense_id,
                    data: attributes,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (expenses) {
                    console.log('success', expenses);
                    success(expenses);
                }).error(function (data) {
                    console.log(data);
                })
            },
            show: function (id,expense_id,success) {
                $http({
                    method: 'GET',
                    url: globalSettings.api_base_url + '/v1/cars/'+ id + '/expenses/' + expense_id,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (expenses) {
                    console.log('success', expenses);
                    success(expenses);
                }).error(function (data) {
                    console.log(data);
                })
            },
            create: function (id,attributes, success) {
                $http({
                    method: 'POST',
                    url: globalSettings.api_base_url + '/v1/cars/' + id + '/expenses',
                    data: attributes,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (expenses) {
                        success(expenses);
                    }).error(function (data) {
                        console.log(data);
                    })
            },
            delete: function(id,expenseID,succes){
                console.log(globalSettings.api_base_url);
                $http({
                    method: 'DELETE',
                    url: globalSettings.api_base_url + '/v1/cars/' + id + '/expenses/' + expenseID,
                    headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }

                }).success(function(expenses){
                        succes(expenses);
                    })
                    .error(function(expenses){
                        console.log(expenses);
                    })
            }
        }
    }]);
