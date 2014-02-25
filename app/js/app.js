angular.module('fleetonrails', ['ngRoute', 'ui.bootstrap' , 'fleetonrails.services',
        'fleetonrails.controllers', 'fleetonrails.factories']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {templateUrl: 'partials/login.html'}).
            when('/main', {templateUrl: 'partials/main.html', controller: 'MainCtrl'}).
            when('/profile',{templateUrl:'partials/profile.html', controller: 'MainCtrl'}).
            otherwise({redirectTo: '/'});
    }]);
