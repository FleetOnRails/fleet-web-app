'use strict';

angular.module('fleetonrails', ['ngRoute', 'fleetonrails.controllers', 'fleetonrails.filters', 'fleetonrails.directives']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'}).
            otherwise({redirectTo: '/'});
    }]);
