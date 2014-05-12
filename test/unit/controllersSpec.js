'use strict';

/* jasmine specs for controllers go here */

describe('Unit Testing controllers', function(){
  beforeEach(module('fleetonrails.controllers', 'fleetonrails.services', 'fleetonrails.factories', 'ngRoute','base64'));

    it('should have a car-controller controller', inject(function($controller) {
        var scope = {},
            ctrl = $controller('carController', {$scope:scope});
        expect(ctrl).toBeTruthy
    }));

    it('should have a car-edit-controller controller', inject(function($controller) {
        var scope = {},
            ctrl = $controller('carEditController', {$scope:scope});
        expect(ctrl).toBeTruthy
    }));

    it('should have a car diagonstic faults controller  controller', inject(function($controller) {
        var scope = {},
            ctrl = $controller('carDiagnosticFaultsController', {$scope:scope});
        expect(ctrl).toBeTruthy
    }));

    it('should have a car diagonstic statistics controller  controller', inject(function($controller) {
        var scope = {},
            ctrl = $controller('carDiagnosticStatisticsController', {$scope:scope});
        expect(ctrl).toBeTruthy
    }));

    it('should have a car-documents controller  controller', inject(function($controller) {
        var scope = {},
            ctrl = $controller('carDocumentsController', {$scope:scope});
        expect(ctrl).toBeTruthy
    }));

    it('should have a car fuel controller  controller', inject(function($controller) {
        var scope = {},
            ctrl = $controller('fuelController', {$scope:scope});
        expect(ctrl).toBeTruthy
    }));

    it('should have a car fuel edit controller  controller', inject(function($controller) {
        var scope = {},
            ctrl = $controller('fuelEditCtrl', {$scope:scope});
        expect(ctrl).toBeTruthy
    }));

    it('should have a gps  controller', inject(function($controller) {
        var scope = {},
            ctrl = $controller('gpsController', {$scope:scope});
        expect(ctrl).toBeTruthy
    }));

    it('should have a group car dashboard controller', inject(function($controller) {
        var scope = {},
            ctrl = $controller('groupCarDashController', {$scope:scope});
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
