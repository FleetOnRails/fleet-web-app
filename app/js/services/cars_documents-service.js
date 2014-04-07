/**
 * Created by krystian on 06/03/2014.
 */
angular.module('fleetonrails.services.cars_documents-service', [])

    .factory('CarsDocumentsService', [ '$http', 'globalSettings', function ($http, globalSettings) {
        return {
            get: function (id,success) {
                $http({
                    method: 'GET',
                    url: globalSettings.api_base_url + '/v1/cars/' + id + '/documents',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (documents) {
                        console.log('success', documents);
                        success(documents);
                    }).error(function (data) {
                        console.log(data);
                    })
            },
            create: function (id,success,attributes) {
                $http({
                    method: 'POST',
                    url: globalSettings.api_base_url + '/v1/cars/' + id + '/documents',
                    data: attributes,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (documents) {
                        console.log('success', documents);
                        success(documents);
                    }).error(function (data) {
                        console.log(data);
                    })
            }

        }
    }]);
