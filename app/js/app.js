angular.module('fleetonrails', ['ngRoute', 'ui.bootstrap' , 'fleetonrails.services', 'fleetonrails.controllers']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {templateUrl: 'partials/login.html'}).
            otherwise({redirectTo: '/'});
    }]);
