angular.module('fleetonrails.controllers.car_diagnostic_faults-controller', [])

    .controller('carDiagnosticFaultsController', ['$scope', 'CarsDiagnosticFaultsService', '$location', '$routeParams',
        function ($scope, CarsDiagnosticFaultsService, $location, $routeParams) {

            $scope.diagnostic_faults = [];


            $scope.getFaults = function () {
                CarsDiagnosticFaultsService.get(id,function (data) {
                    angular.forEach(data, function (diagnostic_faults) {
                        angular.forEach(diagnostic_faults, function (value) {
                            $scope.diagnostic_faults.push(value.diagnostic_fault)
                        })
                    });
                });
            };


        }]);