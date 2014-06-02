angular.module('fleetonrails.services.groups_vendors-service', [])

    .factory('GroupsVendorsService', [ '$http', 'globalSettings', function($http, globalSettings) {
        return {
            get: function(id,success, error) {
                $http({
                    method: 'GET',
                    url: globalSettings.api_base_url + '/v1/groups/' + id + '/vendors',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function(vendors){
                        success(vendors);
                    }).error(function(vendors) {
                        error(vendors)
                        console.log(vendors);
                    })
            },

            create: function(id,data, success, error) {
                $http({
                    method: 'POST',
                    url: globalSettings.api_base_url + '/v1/groups/' + id + '/vendors',
                    data: data,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function(vendors) {
                        success(vendors);
                    }).error(function(vendors) {
                        error(vendors)
                        console.log(vendors);
                    })
            },
            delete: function(id,vendorID, success, error) {
                $http({
                    method: 'DELETE',
                    url: globalSettings.api_base_url + '/v1/groups/' + id + '/vendors/' + vendorID,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function(vendors) {
                        success(vendors);
                    }).error(function(vendors) {
                        error(vendors);
                        console.log(vendors);
                    })
            }
        }
    }]);