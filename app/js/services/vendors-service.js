
angular.module('fleetonrails.services.vendors-service', [])

    .factory('VendorsService', [ '$http', 'globalSettings', function ($http, globalSettings) {
        return {
            get: function (success) {
                $http({
                    method: 'GET',
                    url: globalSettings.api_base_url + '/v1/vendors',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (vendors) {
                        console.log('success', vendors);
                        success(vendors);
                    }).error(function (data) {
                        console.log(data);
                    })
            },
            create: function (attributes, success) {
                $http({
                    method: 'POST',
                    url: globalSettings.api_base_url + '/v1/vendors',
                    data: attributes,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (vendors) {
                        success(vendors);
                    }).error(function (data) {
                        console.log(data);
                    })
            },
            delete: function(id,succes){
                console.log(globalSettings.api_base_url);
                $http({
                    method: 'DELETE',
                    url: globalSettings.api_base_url +'/v1/vendors/' + id ,
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
