angular.module('fleetonrails.controllers.groups_vendors-controller', [])

    .controller('GroupsVendorsCtrl', [ '$scope', 'MeService', '$location', '$routeParams','loginService','GroupsService','GroupsVendorsService',
        function ($scope, MeService,$location,$routeParams,loginService,GroupsService,GroupsVendorsService) {

            $scope.alerts =[]
            $scope.vendors = []

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

            $scope.addVendor = function(){
                var attributes= {
                    vendor:{
                        name: $scope.vendor.name,
                        supplies: $scope.vendor.supplies,
                        location_attributes:{
                            address: $scope.vendor.address
                        }
                    }
                }
                GroupsVendorsService.create($routeParams.id,attributes,function(vendor){
                    $scope.alerts.push({msg: 'Vendor added to group successfully', type: 'success'});
                    $scope.getVendors()
                })

            }

            $scope.deleteVendor = function(vendor_id,id){
                GroupsVendorsService.delete($routeParams.id,vendor_id,function(vendor){
                    console.log('delete vendor', vendor)
                    $scope.alerts.push({msg:'Vendor successfully delete from group', type:'success'});
                    $scope.vendors.splice(id, 1);
                })
            }

            $scope.getVendors = function(){
                GroupsVendorsService.get($routeParams.id,function(data){
                    $scope.vendors = [];
                    angular.forEach(data, function (vendors) {
                        angular.forEach(vendors, function(value) {
                            $scope.vendors.push(value.vendor)
                            console.log(value.vendor)
                        })
                    });
                })
            }

            $scope.getGroup = function(id){
                GroupsService.show(id,function(data){
                    $scope.group = data['group'];
                })
            }

            if ($routeParams && $routeParams.id) {
                $scope.getGroup($routeParams.id)
                $scope.getVendors()
            }
        }]);