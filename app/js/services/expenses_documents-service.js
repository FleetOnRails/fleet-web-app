
angular.module('fleetonrails.services.expenses_documents-service', [])

    .factory('ExpensesDocumentsService', [ '$http', 'globalSettings', function ($http, globalSettings) {
        return {
            get: function (id,success) {
                $http({
                    method: 'GET',
                    url: globalSettings.api_base_url + '/v1/expenses/' + id +'/documents',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (documents) {
                        console.log('success', documents);
                        success(documents);
                    }).error(function (documents) {
                        console.log(documents);
                    })
            },
            create: function (id,attributes, success) {
                $http({
                    method: 'POST',
                    url: globalSettings.api_base_url + '/v1/expenses/' + id + '/documents',
                    data: attributes,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function (documents) {
                        success(documents);
                    }).error(function (documents) {
                        console.log(documents);
                    })
            },
            delete: function(id,documentID,succes){
                console.log(globalSettings.api_base_url);
                $http({
                    method: 'DELETE',
                    url: globalSettings.api_base_url +'/v1/expenses/' + id +'/documents/' + documentID ,
                    headers:{
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }

                }).success(function(documents){
                        succes(documents);
                    })
                    .error(function(documents){
                        console.log(documents);
                    })
            }
        }
    }]);
