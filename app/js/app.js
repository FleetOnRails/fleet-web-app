angular.module('fleetonrails', ['ngRoute', 'ui.bootstrap' , 'fleetonrails.services',
        'fleetonrails.controllers', 'fleetonrails.factories', 'fleetonrails.directives','google-maps']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {templateUrl: 'partials/login.html'}).
            when('/signup', {templateUrl: 'partials/signup.html'}).
            when('/main', {templateUrl: 'partials/main.html', controller: 'MainCtrl'}).
            when('/profile',{templateUrl:'partials/profile.html', controller: 'MainCtrl'}).
            when('/gps',{templateUrl:'partials/gps.html', controller: 'MainCtrl'}).
            when('/car',{templateUrl:'partials/car.html',controller:'carController'}).
            when('/car/:id',{templateUrl:'partials/car.html',controller:'carController'}).
            otherwise({redirectTo: '/'});
    }]);
