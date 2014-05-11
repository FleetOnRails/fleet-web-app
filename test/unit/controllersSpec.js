'use strict';

/* jasmine specs for controllers go here */

describe('Unit Testing controllers', function(){
  beforeEach(module('fleetonrails.controllers', 'fleetonrails.services', 'fleetonrails.factories', 'ngRoute'));

    it('should have a car-controller controller', inject(function($controller) {
        var scope = {},
            ctrl = $controller('carController', {$scope:scope});
        expect(ctrl).toBeTruthy
    }));

    it('carController#getCars', inject(function($controller, CarsService) {
        var scope = {},
            ctrl = $controller('carController', {$scope:scope});
        CarsService.show = function(id, callback) { callback({car: {make:'reno',model:'clio',registration:'02d01', current_gps_statistic:{kmh:50.0,latitude:50.5,longitude:50}}}) }
        scope.getCar(1);
        expect(scope.car).toBeTruthy
    }))

});
