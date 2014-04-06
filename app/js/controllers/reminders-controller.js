/**
 * Created by krystian on 23/03/2014.
 */
angular.module('fleetonrails.controllers.reminders-controller', [])

    .controller('remindersController', ['$scope', 'RemindersService', 'CarsService','$location', '$routeParams', function ($scope,RemindersService, CarsService ,$location, $routeParams) {

        $scope.reminders = [];

        $scope.alerts = [];


        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        getCar = function (id) {
            CarsService.show(id, function (data) {
                $scope.car = data['car'];
            });
        };

        $scope.addReminder = function(){
            var attributes = {
                reminder: {
                    odometer: $scope.reminders.odometer,
                    reminder_type: $scope.reminders.reminder_type,
                    description: $scope.reminders.description,
                    date: $scope.reminders.date
                }
            };
            console.log(attributes)
            RemindersService.create($routeParams.id,attributes, function (reminders) {
                $scope.alerts.push({msg: 'Reminder successfully created! ', type: 'success'});
                console.log(reminders)
            })
        };


        getReminders = function(id) {
            RemindersService.get(id,function (data) {
                angular.forEach(data, function (reminders, index) {
                    angular.forEach(reminders, function(value, index) {
                        $scope.reminders.push(value.reminder)
                    })
                });
            });
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
            getReminders($routeParams.id)
            getCar($routeParams.id)
        } else {
            console.log('something wrong')
        }



    }]);