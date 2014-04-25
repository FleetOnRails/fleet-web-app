angular.module('fleetonrails.controllers.groups_vendors-controller', [])

    .controller('GroupsVendorsCtrl', [ '$scope', 'MeService', '$location', '$routeParams','loginService','GroupsService','GroupsVendorsService',
        function ($scope, MeService,$location,$routeParams,loginService,GroupsService,GroupsVendorsService) {

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
                console.log(attributes)
                GroupsVendorsService.create($routeParams.id,attributes,function(vendor){
                    console.log('Vendor added ',vendor)
                })

            }

            $scope.getGroup = function(id){
                GroupsService.show(id,function(data){
                    $scope.group = data['group'];
                })
            }

            if ($routeParams && $routeParams.id) {
                $scope.getGroup($routeParams.id)
            }
        }]);