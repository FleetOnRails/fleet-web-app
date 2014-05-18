angular.module('fleetonrails.controllers.doc_upload-controller', [])

    .controller('docCtrl', [ '$scope', '$upload', 'globalSettings', 'CarsService', '$routeParams',
        function ($scope, $upload, globalSettings, CarsService, $routeParams) {

            $scope.groupNav= false;

            getCar = function (id) {
                CarsService.show(id, function (data) {
                    $scope.car = data['car'];
                });
            };

            if ($routeParams && $routeParams.id) {
                getCar($routeParams.id)
            } else {
                console.log('something wrong')
            }

            $scope.onFileSelect = function($files) {
                //$files: an array of files selected, each file has name, size, and type.
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];
                    $scope.upload = $upload.upload({
                        url: globalSettings.api_base_url + '/v1/cars/'+ $routeParams.id + '/documents',
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                            'Accept': 'application/json'

                        },
                        // withCredentials: true,
                        data: {
                            title: $scope.document.title
                        },
                        file: file// or list of files: $files for html5 only
                        /* set the file formData name ('Content-Desposition'). Default is 'file' */
                        //fileFormDataName: myFile, //or a list of names for multiple files (html5).
                        /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
                        //formDataAppender: function(formData, key, val){}
                    }).progress(function(evt) {
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).success(function(data, status, headers, config) {
                        // file is uploaded successfully
                        console.log(data);
                    });
                    //.error(...)
                    //.then(success, error, progress);
                    //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
                }
            };

        }]);