angular.module('fleetonrails.controllers.car_documents-controller', [])

    .controller('carDocumentsController', ['$scope', 'CarsDocumentsService','CarsService', '$location',  '$routeParams','$base64',
        function ($scope, CarsDocumentsService, CarsService,$location, $routeParams,$base64) {


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
            }

            $scope.createDocument = function(){
                var selected_file = new FileReader();
                selected_file.onload=function(e){
                    console.log(e.target.result);
                }
                $scope.encoded = $base64.encode(selected_file);
                var attributes = {
                    document:{
                        name: $scope.document.name,
                        document_extension : $scope.document.document_extension,
                        document_data : $scope.encoded
                    }
                }
                CarsDocumentsService.create($routeParams.id,attributes,function(document){
                    console.log(document)
                    $scope.alerts.push({msg: 'Fuel entry successfully created! ', type: 'success'});
                })
            }

        }]);