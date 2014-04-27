/**
 * Created by krystian on 23/03/2014.
 */
angular.module('fleetonrails.controllers.vendors_products-controller', [])

    .controller('vendorProductsCtrl', ['$scope', 'VendorsProductsService','$location', '$routeParams','MeService',
        function ($scope,VendorsProductsService,$location, $routeParams,MeService) {

            $scope.alerts = [];
            $scope.pending = true

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };



            MeService.get(function (user) {
                $scope.user = user;
            }, function(data) {
                alert('Not authorized')
                $location.path('/')
            });

            $scope.addProduct = function(){
                var attributes= {
                    product:{
                        name: $scope.product.name,
                        price: $scope.product.price,
                        part_no : $scope.product.part_no
                    }
                }
                VendorsProductsService.create($routeParams.id,attributes,function(product){
                    $scope.alerts.push({msg: 'Product added to vendor successfully', type: 'success'});
                    $scope.getProducts()
                })
            }

            $scope.deleteProduct = function(product_id,id){
                VendorsProductsService.delete($routeParams.id,product_id,function(product){
                    console.log('delete vendor', product)
                    $scope.alerts.push({msg:'Product successfully delete from vendor', type:'success'});
                    $scope.products.splice(id, 1);
                })
            }

            $scope.getProducts = function(){
                VendorsProductsService.get($routeParams.id,function(data){
                    $scope.products = [];
                    angular.forEach(data, function (products) {
                        angular.forEach(products, function(value) {
                            $scope.products.push(value.product)
                            console.log(value.product)
                        })
                    });
                    $scope.pending = false
                })
            }

            if($routeParams && $routeParams.id){
                $scope.getProducts()
            }



        }]);