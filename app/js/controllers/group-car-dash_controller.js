angular.module('fleetonrails.controllers.group_car_dash-controller', [])

    .controller('groupCarDashController', ['$scope', 'GroupsCarsService', '$location', '$timeout', '$interval', 'MeService','$routeParams','GroupsService',
        function ($scope, GroupsCarsService, $location, $timeout, $interval,MeService, $routeParams,GroupsService) {

            var dynamicMarkers = [];
            var center = {
                latitude: 54,
                longitude: -7
            }

            angular.extend($scope, {
                map: {
                    control: {},
                    showTraffic: true,
                    showBicycling: false,
                    showWeather: false,
                    showHeat: false,
                    center: center,
                    options: {
                        streetViewControl: true,
                        panControl: false,
                        maxZoom: 20,
                        minZoom: 3
                    },
                    zoom: 5,
                    dragging: false,
                    bounds: {},
                    dynamicMarkers: []
                }
            });

            $scope.getGroup = function(id){
                GroupsService.show(id,function(data){
                    console.log(data)
                    $scope.group = data['group'];
                })
            }


            $scope.getCar = function (id) {
                GroupsCarsService.show(id, $routeParams.car_id,function (data) {
                    $scope.gauge_data = [];
                    $scope.car = data['car'];
                    if ($scope.car.current_gps_statistic) {
                        dynamicMarkers = [
                            {
                                latitude: $scope.car.current_gps_statistic.latitude,
                                longitude: $scope.car.current_gps_statistic.longitude,
                                showWindow: false
                            }
                        ];

                        center = {
                            latitude: $scope.car.current_gps_statistic.latitude,
                            longitude: $scope.car.current_gps_statistic.longitude
                        };
                        $scope.gauge_data.push(
                            {label: "Speed", value:$scope.car.current_gps_statistic.kmh.toFixed(0), color: "#5398f1", suffix: "Km/h"}
                        )
                    }
                    else {
                        dynamicMarkers = [];
                        center = {
                            latitude: 53.5258,
                            longitude: -7.3401
                        };
                    }
                    $scope.haveGpsData = true;
                });
            };



            $scope.stopInterval = function(){
                $interval.cancel(timeInterval);
            }

            if ($routeParams && $routeParams.id) {
                console.log('inside group car dashboard ')
                $scope.getCar($routeParams.id);
                $scope.getGroup($routeParams.id);
                var timeInterval = $interval(function() {
                    $scope.getCar($routeParams.id)
                    $scope.map.dynamicMarkers = dynamicMarkers;
                    $scope.map.center = center;
                    $scope.apply
                }, 5000)
                $scope.$on('$destroy', function () { $interval.cancel(timeInterval); });
            }

            MeService.get(function (user) {
                $scope.user = user;
            }, function(data) {
                alert('Not authorized')
                $location.path('/')
            });


            $timeout(function () {
                $scope.map.dynamicMarkers = dynamicMarkers;
                $scope.map.center = center;
                $scope.pending = false
            }, 2000);
        }]);