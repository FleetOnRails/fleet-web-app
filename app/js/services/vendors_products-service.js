
angular.module('fleetonrails.services.vendors_products-service', [])

    .factory('VendorsProductsService', [ '$http', 'globalSettings', function ($http, globalSettings) {
        return {
            get: function (id,success) {
                $http({
                    method: 'GET',
                    url: globalSettings.api_base_url + '/v1/vendors/' + id +'/products',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (products) {
                        console.log('success', products);
                        success(products);
                    }).error(function (products) {
                        console.log(products);
                    })
            },
            create: function (id,attributes, success) {
                $http({
                    method: 'POST',
                    url: globalSettings.api_base_url + '/v1/vendors/' + id + '/products',
                    data: attributes,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (products) {
                        success(products);
                    }).error(function (products) {
                        console.log(products);
                    })
            },
            delete: function(id,productID,succes){
                console.log(globalSettings.api_base_url);
                $http({
                    method: 'DELETE',
                    url: globalSettings.api_base_url +'/v1/vendors/' + id +'/products/' + productID ,
                    headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }

                }).success(function(products){
                        succes(products);
                    })
                    .error(function(products){
                        console.log(products);
                    })
            }
        }
    }]);
