angular.module('fleetonrails.controllers.groups_vendors-controller', [])

    .controller('GroupsVendorsCtrl', [ '$scope', 'MeService', '$location', '$routeParams','loginService','GroupsService','GroupsVendorsService',
        function ($scope, MeService,$location,$routeParams,loginService,GroupsService,GroupsVendorsService) {

            $scope.alerts =[]

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