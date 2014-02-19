angular.module('fleetonrails', ['ngRoute', 'ui.bootstrap' , 'fleetonrails.services',
        'fleetonrails.controllers', 'fleetonrails.factories']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/main', {templateUrl: 'partials/main.html', controller: 'MainCtrl'}).
            when('/', {templateUrl: 'partials/login.html'}).
            otherwise({redirectTo: '/'});
    }]);
