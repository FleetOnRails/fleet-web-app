/**
 * Created by krystian on 23/03/2014.
 */
angular.module('fleetonrails.controllers.vendors-controller', [])

    .controller('vendorsController', ['$scope', 'VendorsService','$location', '$routeParams', function ($scope,VendorsService,$location, $routeParams) {

        $scope.vendors = [];
        $scope.pending = true

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
            console.log(attributes);
            VendorsService.create(attributes,function(vendors){
                console.log(vendors)
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


    }]);