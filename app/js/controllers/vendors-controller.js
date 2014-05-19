/**
 * Created by krystian on 23/03/2014.
 */
angular.module('fleetonrails.controllers.vendors-controller', [])

    .controller('vendorsController', ['$scope', 'VendorsService','$location', '$routeParams',
        function ($scope,VendorsService,$location, $routeParams) {

        $scope.vendors = [];
        $scope.alerts = [];
        $scope.pending = true

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.addVendor = function(){
            var attributes = {
                vendor: {
                    name: $scope.vendor.name,
                    supplies: $scope.vendor.supplies,
                    location_attributes : {
                        address:$scope.vendor.location_attributes
                    }
                }
            };
            VendorsService.create(attributes,function(vendors){
                $location.path('/vendors');
            })
        }
        $scope.changeToAddVendor = function(){
            $location.path('/vendors/add_vendor');
        }

        VendorsService.get(function (data) {
            $scope.venodors = [];
            angular.forEach(data, function (vendors, index) {
                angular.forEach(vendors, function(value, index) {
                    $scope.vendors.push(value.vendor)
                })
            });
            $scope.pending = false;
        });

        getVenodors = function(){
            VendorsService.get(function (data) {
                $scope.vendors = [];
                angular.forEach(data, function (vendors, index) {
                    angular.forEach(vendors, function(value, index) {
                        $scope.vendors.push(value.vendor)
                    })
                });
                $scope.pending = false;
            });
        }

        $scope.deleteVendor = function(vendorID,id){
            VendorsService.delete(vendorID,function(){
                $scope.alerts = [];
                $scope.alerts.push({msg: 'Vendor successfully deleted! ', type: 'success'});
                $scope.vendors.splice(id, 1);
            })
        }


    }]);