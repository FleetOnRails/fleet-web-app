angular.module('fleetonrails', ['ngRoute','ngAnimate','n3-pie-chart','base64',
        'n3-charts.linechart','ui.bootstrap' ,'angularFileUpload', 'fleetonrails.services',
        'fleetonrails.controllers', 'fleetonrails.factories', 'highcharts-ng','fleetonrails.directives.navbar','google-maps',
        'angularFileUpload']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {templateUrl: 'partials/login.html'}).
            when('/signup', {templateUrl: 'partials/signup.html',controller:'usersController'}).
            when('/main', {templateUrl: 'partials/main.html', controller: 'MainCtrl'}).
            when('/profile',{templateUrl:'partials/profile.html'}).
            when('/gps',{templateUrl:'partials/gps.html', controller: 'gpsController'}).
            when('/car',{templateUrl:'partials/car.html',controller:'carController'}).
            when('/addcar',{templateUrl:'partials/addcar.html',controller:'carController'}).

            when('/car/:id',{templateUrl:'partials/car.html',controller:'carController' }).
            when('/car/:id/fuel',{templateUrl:'partials/fuel.html',controller:'fuelController'}).
            when('/cars/:id/fuel_entries/:fuel_id',{templateUrl:'partials/fueledit.html',controller:'fuelEditCtrl'}).

            when('/car/:id/edit',{templateUrl:'partials/editcar.html',controller:'carEditController'}).
            when('/car/:id/service',{templateUrl:'partials/service.html',controller:'serviceController'}).
            when('/cars/:id/expenses/:expense_id',{templateUrl:'partials/expenseedit.html',controller:'expensesEditCtrl'}).
            when('/car/:id/reminders',{templateUrl:'partials/reminders.html',controller:'remindersController'}).
            when('/car/:id/reminders/:reminder_id',{templateUrl:'partials/remindersedit.html',controller:'remindersEditCtrl'}).
            when('/car/:id/documents',{templateUrl:'partials/documents.html',controller:'docCtrl'}).
            when('/car/:id/add_fuel',{templateUrl:'partials/addFuel.html',controller:'fuelController'}).
            when('/car/:id/add_expense',{templateUrl:'partials/addExpense.html',controller:'serviceController'}).
            when('/car/:id/add_reminder',{templateUrl:'partials/addReminder.html',controller:'remindersController'}).

            when('/vendors',{templateUrl:'partials/vendors.html',controller:'vendorsController'}).
            when('/vendors/add_vendor',{templateUrl:'partials/addVendor.html',controller:'vendorsController'}).
            when('/vendors/:id',{templateUrl:'partials/products.html',controller:'vendorProductsCtrl'}).
            when('/addgroup',{templateUrl:'partials/addgroup.html',controller:'GroupsCtrl'}).
            when('/groups',{templateUrl:'partials/groups.html',controller:'GroupsCtrl'}).

            when('/group/:id',{templateUrl:'partials/group.html',controller:'GroupCtrl'}).
            when('/group/:id/users',{templateUrl:'partials/groupsusers.html',controller:'GroupsUsersCtrl'}).
            when('/group/:id/cars',{templateUrl:'partials/groupcars.html',controller:'GroupsCarsCtrl'}).
            when('/group/:id/vendors',{templateUrl:'partials/groupvendors.html',controller:'GroupsVendorsCtrl'}).
            when('/group/:id/destinations',{templateUrl:'partials/groupdest.html',controller:'GroupsDestCtrl'}).

            when('/group/:id/car/:car_id',{templateUrl:'partials/groupcarDash.html',controller:'groupCarDashController'}).
            when('/group/:id/car/:car_id/fuel',{templateUrl:'partials/fuel.html',controller:'groupCarFuelCtrl'}).
            when('/group/:id/car/:car_id/edit',{templateUrl:'partials/editcar.html',controller:'groupCarEditCtrl'}).
            when('/group/:id/car/:car_id/service',{templateUrl:'partials/service.html',controller:'groupCarServiceCtrl'}).
            when('/group/:id/car/:car_id/reminders',{templateUrl:'partials/reminders.html',controller:'groupCarRemindersCtrl'}).
            when('/group/:id/car/:car_id/documents',{templateUrl:'partials/documents.html',controller:''}).

            otherwise({redirectTo: '/'});
    }])

    .factory('_', function() {
        return window._;
    });
