angular.module('fleetonrails.controllers.doc_upload-controller', [])

    .controller('docCtrl', [ '$scope', '$fileUploader', 'globalSettings', 'CarsService', '$routeParams',
        function ($scope, $fileUploader, globalSettings, CarsService, $routeParams) {

            $scope.groupNav= false;

            getCar = function (id) {
                CarsService.show(id, function (data) {
                    console.log('Data', data)
                    $scope.car = data['car'];
                    console.log('Car id', $scope.car.id)
                    var id = $scope.car.id
                });
            };

            if ($routeParams && $routeParams.id) {
                getCar($routeParams.id)
            } else {
                console.log('something wrong')
            }

            var uploader = $scope.uploader = $fileUploader.create({
                scope: $scope,
                url: globalSettings.api_base_url + '/v1/cars/' + 2 + '/documents',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                formData: [
                    { document: {
                        title: 'hello'
                    } }
                ]
            });

            var item = {};
            item.remove = function () {
                uploader.removeFromQueue(this);
            };

        }])