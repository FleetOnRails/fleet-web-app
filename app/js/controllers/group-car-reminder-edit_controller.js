/**
 * Created by krystian on 23/03/2014.
 */
angular.module('fleetonrails.controllers.group_car_reminder_edit-controller', [])

    .controller('groupCarReminderEditCtrl', ['$scope', 'RemindersService','GroupsService','$location', '$routeParams', 'MeService','$timeout','GroupsCarsService',
        function ($scope,RemindersService ,GroupsService,$location, $routeParams,MeService,$timeout,GroupsCarsService) {

            $scope.reminders = [];
            $scope.alerts = [];
            $scope.personalNav = false;
            $scope.groupNav = true;


            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

            $scope.removeAlerts = function () {
                $timeout(function () {
                    $scope.alerts = [];
                }, 4000);
            };

            $scope.changeToAddReminder = function(){
                $location.path('/group/' + $routeParams.id +'/car/'+ $routeParams.car_id +'/add_reminder');
            }

            getCar = function (id) {
                GroupsCarsService.show(id, $routeParams.car_id,function (data) {
                    $scope.car = data['car'];
                });
            };

            $scope.getGroup = function(id){
                GroupsService.show(id,function(data){
                    console.log(data)
                    $scope.group = data['group'];
                })
            }

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
                RemindersService.update($routeParams.car_id,$routeParams.reminder_id,attributes,function(data){
                    console.log('succes update', data)
                    $location.path('/group/' + $routeParams.id + '/car/' + $routeParams.car_id + '/reminders');
                });
            };


            $scope.getReminder = function(){
                RemindersService.show($routeParams.car_id,$routeParams.reminder_id,function(reminder){
                    $scope.reminder = reminder;
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
                $scope.getReminder();
                getCar($routeParams.id);
                $scope.getGroup($routeParams.id);
            }



        }]);