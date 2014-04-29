/**
 * Created by krystian on 23/03/2014.
 */
angular.module('fleetonrails.controllers.group_car_services-controller', [])

    .controller('groupCarServiceCtrl', ['$scope', 'ServicesService','GroupsCarsService','$location', 'GroupsService','$routeParams','MeService',
        function ($scope,ServicesService ,$location, GroupsCarsService,GroupsService,$routeParams,MeService) {

            $scope.expenses = [];
            $scope.alerts = [];
            $scope.personalNav = false;
            $scope.groupNav = true;
            $scope.carId = $routeParams.car_id;

            $scope.CollapseDemoCtrl = function(){
                $scope.isCollapsed = false;

            }

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };


            $scope.getGroup = function(id){
                GroupsService.show(id,function(data){
                    console.log(data)
                    $scope.group = data['group'];
                })
            }


            getExpenses = function(id) {
                $scope.expenses = [];
                ServicesService.get(id,function (data) {
                    angular.forEach(data, function (expenses, index) {
                        angular.forEach(expenses, function(value, index) {
                            $scope.expenses.push(value.expense)
                        })
                    });
                });
            };

            $scope.addRecord = function(){
                var attributes = {
                    expense: {
                        odometer: $scope.expenses.odometer,
                        expense_type: $scope.expenses.expense_type,
                        description: $scope.expenses.description,
                        price : $scope.expenses.price,
                        date: $scope.expenses.date,
                        location_attributes:{
                            address: $scope.expenses.location_attributes.address
                        }
                    }
                };
                console.log(attributes)
                ServicesService.create($routeParams.car_id,attributes, function (expsenses) {
                    $scope.alerts.push({msg: 'Expense successfully created! ', type: 'success'});
                    getExpenses($routeParams.car_id)
                    $scope.apply
                    console.log(expsenses)
                })

            }

            $scope.deleteExpense = function(expenseId,id){
                ServicesService.delete($routeParams.car_id,expenseId ,function(expenses){
                    $scope.alerts = [];
                    $scope.alerts.push({msg: 'Expense successfully deleted! ', type: 'success'});

                    $scope.expenses.splice(id, 1);
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



            $scope.toggleMin = function() {
                $scope.minDate = ( $scope.minDate ) ? null : new Date();
            };
            $scope.toggleMin();

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
                getExpenses($routeParams.car_id);
                //getCar($routeParams.id);
                $scope.getGroup($routeParams.id);
            } else {
                console.log('something wrong');
            }

            MeService.get(function (user) {
                $scope.user = user;
            }, function(data) {
                alert('Not authorized')
                $location.path('/')
            });



        }]);