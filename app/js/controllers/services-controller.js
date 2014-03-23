/**
 * Created by krystian on 23/03/2014.
 */
angular.module('fleetonrails.controllers.services-controller', [])

    .controller('serviceController', ['$scope', 'ServicesService', '$location', '$routeParams', function ($scope, ServicesService, $location, $routeParams) {

        $scope.service_records = [];

        $scope.CollapseDemoCtrl = function(){
            $scope.isCollapsed = false;

        }

        getServiceRecords = function(id) {
            ServicesService.get(id,function (data) {
                angular.forEach(data, function (service_records, index) {
                    angular.forEach(service_records, function(value, index) {
                        $scope.service_records.push(value.service_record)
                    })
                });
            });
        };

        $scope.addRecord = function(id){
            var attributes = {
                service_record: {
                    odometer_reading: $scope.service_record.odometer_reading,
                    technician: $scope.service_record.technician,
                    description: $scope.service_record.description,
                    location_attributes:{
                        address: $scope.service_record.location_attributes.address
                    }
                }
            };
            console.log(attributes)
            ServicesService.create(id,attributes, function (service_record) {
                console.log(service_record)
            })

        }

        if ($routeParams && $routeParams.id) {
            getServiceRecords($routeParams.id)
        } else {
            console.log('something wrong')
        }



    }]);