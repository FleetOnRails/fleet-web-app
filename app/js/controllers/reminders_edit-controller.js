/**
 * Created by krystian on 23/03/2014.
 */
angular.module('fleetonrails.controllers.reminders_edit-controller', [])

    .controller('remindersEditCtrl', ['$scope', 'RemindersService', 'CarsService','$location', '$routeParams', 'MeService','$timeout',
        function ($scope,RemindersService, CarsService ,$location, $routeParams,MeService,$timeout) {

            $scope.alerts = [];



            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

            $scope.removeAlerts = function () {
                $timeout(function () {
                    $scope.alerts = [];
                }, 4000);
            };

            $scope.getReminder = function(){
              RemindersService.show($routeParams.id,$routeParams.reminder_id,function(reminder){
                  $scope.reminder = reminder;
              })
            };

            $scope.updateReminder = function(){
                var attributes = {
                    reminder: {
                        odometer: $scope.reminder.reminder.odometer,
                        reminder_type: $scope.reminder.reminder.reminder_type,
                        description: $scope.reminder.reminder.description,
                        date: $scope.reminder.reminder.date
                    }
                };
                console.log('attr', attributes)
                RemindersService.update($routeParams.id,$routeParams.reminder_id,attributes,function(data){
                    console.log('succes update', data)
                    $location.path('/car/' + $routeParams.id + '/reminders')
                });
            };

            getCar = function (id) {
                CarsService.show(id, function (data) {
                    $scope.car = data['car'];
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
                $scope.getReminder();
                getCar($routeParams.id);
            }



        }]);