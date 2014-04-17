/**
 * Created by krystian on 23/03/2014.
 */
angular.module('fleetonrails.controllers.vendors-controller', [])

    .controller('vendorsController', ['$scope', 'VendorsService','$location', '$routeParams','MeService',
        function ($scope,VendorsService,$location, $routeParams,MeService) {

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
                $scope.alerts.push({msg: 'Vendor successfully created! ', type: 'success'});
                getVenodors();
            })
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

        MeService.get(function (user) {
            $scope.user = user;
        }, function(data) {
            alert('Not authorized')
            $location.path('/')
        });

        $scope.deleteVendor = function(vendorID,id){
            VendorsService.delete(vendorID,function(){
                $scope.alerts = [];
                $scope.alerts.push({msg: 'Vendor successfully deleted! ', type: 'success'});
                $scope.vendors.splice(id, 1);
            })
        }


    }]);