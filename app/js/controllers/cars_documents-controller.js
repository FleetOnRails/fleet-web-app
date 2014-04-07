angular.module('fleetonrails.controllers.car_documents-controller', [])

    .controller('carDocumentsController', ['$scope', 'CarsDocumentsService','CarsService', '$location',  '$routeParams',
        function ($scope, CarsDocumentsService, CarsService,$location, $routeParams) {


            $scope.documents = [];


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

        }]);