angular.module('fleetonrails', ['ngRoute','ngAnimate','n3-pie-chart','base64', 'n3-charts.linechart','ui.bootstrap' , 'fleetonrails.services',
        'fleetonrails.controllers', 'fleetonrails.factories', 'fleetonrails.directives','google-maps']).
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
            when('/car/:id/edit',{templateUrl:'partials/editcar.html',controller:'carController'}).
            when('/car/:id/service',{templateUrl:'partials/service.html',controller:'serviceController'}).
            when('/car/:id/reminders',{templateUrl:'partials/reminders.html',controller:'remindersController'}).
            when('/car/:id/documents',{templateUrl:'partials/documents.html',controller:'carDocumentsController'}).
            otherwise({redirectTo: '/'});
    }]);
