/**
 * Created by krystian on 23/03/2014.
 */
angular.module('fleetonrails.controllers.group_car_expense_edit-controller', [])

    .controller('groupCarExpenseEditCtrl', ['$scope', 'ServicesService','$location', 'GroupsService','GroupsCarsService','$routeParams',
        function ($scope,ServicesService ,$location,GroupsService,GroupsCarsService,$routeParams) {

            $scope.expenses = [];
            $scope.alerts = [];
            $scope.personalNav = false;
            $scope.groupNav = true;
            $scope.carId = $routeParams.car_id;


            $scope.CollapseDemoCtrl = function(){
                $scope.isCollapsed = false;

            };

            getCar = function (id) {
                GroupsCarsService.show(id, $routeParams.car_id,function (data) {
                    $scope.car = data['car'];
                });
            };


            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };


            $scope.getGroup = function(id){
                GroupsService.show(id,function(data){
                    console.log(data);
                    $scope.group = data['group'];
                })
            };


            getExpense = function(){
                ServicesService.show($routeParams.car_id,$routeParams.expense_id,function(data){
                    $scope.expense = data;
                });
            }

            $scope.updateExpense = function(){
                var attributes = {
                    expense: {
                        odometer: $scope.expense.expense.odometer,
                        expense_type: $scope.expense.expense.expense_type,
                        description: $scope.expense.expense.description,
                        price : $scope.expense.expense.price,
                        date: $scope.expense.expense.date,
                        location_attributes:{
                            address: $scope.expense.expense.location.address
                        }
                    }
                };
                console.log(attributes)
                ServicesService.update($routeParams.car_id,$routeParams.expense_id,attributes,function(data){
                    console.log('succes update' + data)
                    $location.path('/group/' + $routeParams.id +'/car/'+ $routeParams.car_id +'/service');

                })
            };


            $scope.today = function() {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.showWeeks = true;
            $scope.toggleWeeks = function () {
                $scope.showWeeks = ! $scope.showWeeks;
            };

            $scope.clear = function () {
                $scope.dt = null;
            };


            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

            $scope.dateOptions = {
                'year-format': "'yy'",
                'starting-day': 1
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
            $scope.format = $scope.formats[0];

            if ($routeParams && $routeParams.id) {
                getExpense();
                getCar($routeParams.id);
                $scope.getGroup($routeParams.id);
            }

        }]);