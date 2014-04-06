angular.module('fleetonrails.controllers.car_diagnostic_statistics-controller', [])

    .controller('carDiagnosticStatisticsController', ['$scope', 'CarsDiagnosticStatisticsService', '$location',  '$routeParams',
        function ($scope, CarsDiagnosticStatisticsService, $location, $routeParams) {


            $scope.diagnostic_statistics = [];


            $scope.getFaults = function () {
                CarsDiagnosticStatisticsService.get(id,function (data) {
                    angular.forEach(data, function (diagnostic_statistics) {
                        angular.forEach(diagnostic_statistics, function (value) {
                            $scope.diagnostic_statistics.push(value.diagnostic_statistic)
                        })
                    });
                });
            };

        }]);