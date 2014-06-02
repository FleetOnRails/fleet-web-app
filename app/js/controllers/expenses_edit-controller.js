/**
 * Created by krystian on 23/03/2014.
 */
angular.module('fleetonrails.controllers.expenses_edit-controller', [])

    .controller('expensesEditCtrl', ['$scope', 'ServicesService', 'CarsService','$location', '$routeParams',
        function ($scope,ServicesService, CarsService ,$location, $routeParams) {

            $scope.expenses = [];
            $scope.alerts = [];

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

            getCar = function (id) {
                CarsService.show(id, function (data) {
                    $scope.car = data['car'];
                });
            };

            getExpense = function(){
                ServicesService.show($routeParams.id,$routeParams.expense_id,function(data){
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
                ServicesService.update($routeParams.id,$routeParams.expense_id,attributes,function(data){
                    console.log('succes update' + data)
                    $location.path('/car/' + $routeParams.id + '/service')

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
                getCar($routeParams.id);
                getExpense();
            }

        }]);