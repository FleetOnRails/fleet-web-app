/**
 * Created by krystian on 23/03/2014.
 */
angular.module('fleetonrails.controllers.services-controller', [])

    .controller('serviceController', ['$scope', 'ServicesService', 'CarsService','$location', '$routeParams', function ($scope,ServicesService, CarsService ,$location, $routeParams) {

        $scope.expenses = [];

        $scope.CollapseDemoCtrl = function(){
            $scope.isCollapsed = false;

        }

        getCar = function (id) {
            CarsService.show(id, function (data) {
                $scope.car = data['car'];
            });
        };


        getExpenses = function(id) {
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
                service_record: {
                    odometer: $scope.expenses.odometer,
                    expenses_type: $scope.expenses.expenses_type,
                    description: $scope.expenses.description,
                    price : $scope.expenses.price,
                    date: $scope.expenses.date,
                    location_attributes:{
                        address: $scope.expenses.location_attributes.address
                    }
                }
            };
            console.log(attributes)
            ServicesService.create($routeParams.id,attributes, function (expsenses) {
                console.log(expsenses)
            })

        }

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
            getExpenses($routeParams.id)
            getCar($routeParams.id)
        } else {
            console.log('something wrong')
        }



    }]);