angular.module('fleetonrails.controllers.car_documents-controller', [])

    .controller('carDocumentsController', ['$scope', 'CarsDocumentsService','CarsService', '$location',  '$routeParams',
        function ($scope, CarsDocumentsService, CarsService,$location, $routeParams) {


            $scope.documents = [];
            $scope.alerts = [];


            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };



            $scope.getDocuments = function (id) {
                CarsDocumentsService.get(id,function (data) {
                    angular.forEach(data, function (documents) {
                        angular.forEach(documents, function (value) {
                            $scope.documents.push(value.document)
                        })
                    });
                });
            };

            getCar = function (id) {
                CarsService.show(id, function (data) {
                    $scope.car = data['car'];
                });
            };

            if ($routeParams && $routeParams.id) {
                $scope.getDocuments($routeParams.id)
                getCar($routeParams.id)
            } else {
                console.log('something wrong')
            }

            $scope.createDocument = function(){
                var attributes = {
                    document:{
                        name: $scope.document.name,
                        document_extension : $scope.document.document_extension,
                        document_data : $scope.document_data
                    }
                }
                CarsDocumentsService.create($routeParams.id,attributes,function(document){
                    console.log(document)
                    $scope.alerts.push({msg: 'Fuel entry successfully created! ', type: 'success'});
                })
            }

        }]);