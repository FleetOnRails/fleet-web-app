angular.module('fleetonrails.controllers.car_documents-controller', [])

    .controller('carDocumentsController', ['$scope', 'CarsDocumentsService', '$location',  '$routeParams',
        function ($scope, CarsDocumentsService, $location, $routeParams) {


            $scope.documents = [];


            $scope.getDocuments = function () {
                CarsDocumentsService.get($routeParams.id,function (data) {
                    angular.forEach(data, function (documents) {
                        angular.forEach(documents, function (value) {
                            $scope.documents.push(value.document)
                        })
                    });
                });
            };

        }]);