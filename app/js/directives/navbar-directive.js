angular.module('fleetonrails.directives', [])

    .directive('navbar', function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/navbar.html'
        }
    });