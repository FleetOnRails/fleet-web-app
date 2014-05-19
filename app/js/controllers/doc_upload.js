angular.module('fleetonrails.controllers.doc_upload-controller', [])

    .controller('docCtrl', [ '$scope', '$upload', 'globalSettings', 'CarsService', '$routeParams','CarsDocumentsService','$timeout',
        function ($scope, $upload, globalSettings, CarsService, $routeParams,CarsDocumentsService,$timeout) {

            $scope.groupNav= false;
            $scope.documents = [];
            $scope.alerts = [];

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

            getCar = function (id) {
                CarsService.show(id, function (data) {
                    $scope.car = data['car'];
                });
            };

            getDocuments = function(){
                $scope.documents = [];
                CarsDocumentsService.get($routeParams.id,function(data){
                    angular.forEach(data, function (documents, index) {
                        angular.forEach(documents, function(value, index) {
                            $scope.documents.push(value.document);
                        })
                    });
                });
            }

            $scope.deleteDocument = function(doc_id,id){
                CarsDocumentsService.delete($routeParams.id,doc_id,function(){
                    $scope.alerts.push({msg: 'Document successfully deleted! ', type: 'success'});
                    $scope.documents.splice(id, 1);
                    $scope.removeAlerts();
                });
            }

            $scope.removeAlerts = function () {
                $timeout(function () {
                    $scope.alerts = [];
                }, 4000);
            };

            if ($routeParams && $routeParams.id) {
                getCar($routeParams.id);
                getDocuments();
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
                        getDocuments();
                        console.log(data);
                    })
                    .error(function(data){
                        console.log(data);
                    });
                    //.then(success, error, progress);
                    //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
                }
            };

        }]);