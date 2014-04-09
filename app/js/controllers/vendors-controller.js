/**
 * Created by krystian on 23/03/2014.
 */
angular.module('fleetonrails.controllers.vendors-controller', [])

    .controller('vendorsController', ['$scope', 'VendorsService','$location', '$routeParams', function ($scope,VendorsService,$location, $routeParams) {

        $scope.vendors = [];

        $scope.addVendor = function(){
            var attributes = {
                vendor: {
                    name: $scope.vendor.name,
                    supplies: $scope.vendor.supplies,
                    location_attributes : $scope.vendor.location_attributes
                }
            };
            VendorsService.create(attributes,function(vendors){
                console.log(vendors)
            })
        }


    }]);