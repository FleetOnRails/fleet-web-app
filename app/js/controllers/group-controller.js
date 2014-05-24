angular.module('fleetonrails.controllers.group-controller', [])

    .controller('GroupCtrl', [ '$scope', 'MeService', '$location', '$routeParams','loginService','GroupsService',
        function ($scope, MeService,$location,$routeParams, loginService,GroupsService) {


            $scope.haveGpsData = false;
            $scope.pending = true;

            var dynamicMarkers = [
                {
                    latitude: 54,
                    longitude: -7
                }
            ];
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
                    $scope.group = data['group'];
                    console.log('got group');
                    if ($scope.group.location) {
                        console.log('true if');
                        dynamicMarkers = [
                            {
                                latitude: $scope.group.location.latitude,
                                longitude: $scope.group.location.longitude,
                                showWindow: false
                            }
                        ];

                        center = {
                            latitude: $scope.group.location.latitude,
                            longitude: $scope.group.location.longitude
                        };
                        $scope.haveGpsData = true;
                        $scope.pending = false;
                        $scope.map.dynamicMarkers = dynamicMarkers;
                    }
                    else {
                        console.log('false if');
                        $scope.haveGpsData = true;
                        dynamicMarkers = [];
                    }
                })
            };

            if ($routeParams && $routeParams.id) {
                $scope.getGroup($routeParams.id)
            }


        }]);