'use strict';

/* jasmine specs for controllers go here */

describe('Unit Testing controllers', function(){
  beforeEach(module('fleetonrails.controllers', 'fleetonrails.services', 'fleetonrails.factories', 'ngRoute','base64'));

    it('should have a car-controller controller', inject(function($controller) {
        var scope = {},
            ctrl = $controller('carController', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a car-edit-controller controller', inject(function($controller) {
        var scope = {},
            ctrl = $controller('carEditController', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a car diagonstic faults controller  controller', inject(function($controller) {
        var scope = {},
            ctrl = $controller('carDiagnosticFaultsController', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a car diagonstic statistics controller  controller', inject(function($controller) {
        var scope = {},
            ctrl = $controller('carDiagnosticStatisticsController', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a car-documents controller  controller', inject(function($controller) {
        var scope = {},
            ctrl = $controller('carDocumentsController', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a car fuel controller  controller', inject(function($controller) {
        var scope = {},
            ctrl = $controller('fuelController', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a car fuel edit controller  controller', inject(function($controller) {
        var scope = {},
            ctrl = $controller('fuelEditCtrl', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a gps  controller', inject(function($controller) {
        var scope = {},
            ctrl = $controller('gpsController', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a group car dashboard controller', inject(function($controller) {
        var scope = {},
            ctrl = $controller('groupCarDashController', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));


    it('should have a group car edit controller', inject(function($controller) {
        var scope = {},
            ctrl = $controller('groupCarEditCtrl', {$scope:scope});
        expect(ctrl).toBeTruthy
    }));

    it('should have a group car fuel controller ', inject(function($controller) {
        var scope = {},
            ctrl = $controller('groupCarFuelCtrl', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a group car reminder controller ', inject(function($controller) {
        var scope = {},
            ctrl = $controller('groupCarRemindersCtrl', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a group car expenses controller ', inject(function($controller) {
        var scope = {},
            ctrl = $controller('groupCarServiceCtrl', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a group controller ', inject(function($controller) {
        var scope = {},
            ctrl = $controller('GroupCtrl', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a group cars controller ', inject(function($controller) {
        var scope = {},
            ctrl = $controller('GroupsCarsCtrl', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a group destinations controller ', inject(function($controller) {
        var scope = {},
            ctrl = $controller('GroupsDestCtrl', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a group vendors controller ', inject(function($controller) {
        var scope = {},
            ctrl = $controller('GroupsVendorsCtrl', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a groups controller ', inject(function($controller) {
        var scope = {},
            ctrl = $controller('GroupsCtrl', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a groups users controller ', inject(function($controller) {
        var scope = {},
            ctrl = $controller('GroupsUsersCtrl', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a login controller ', inject(function($controller) {
        var scope = {},
            ctrl = $controller('loginController', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a main controller ', inject(function($controller) {
        var scope = {},
            ctrl = $controller('MainCtrl', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a reminders controller ', inject(function($controller) {
        var scope = {},
            ctrl = $controller('remindersController', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a expenses controller ', inject(function($controller) {
        var scope = {},
            ctrl = $controller('serviceController', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a users controller ', inject(function($controller) {
        var scope = {},
            ctrl = $controller('usersController', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a vendors product controller ', inject(function($controller) {
        var scope = {},
            ctrl = $controller('vendorProductsCtrl', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a vendors controller ', inject(function($controller) {
        var scope = {},
            ctrl = $controller('vendorsController', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));

    it('should have a expenses edit  controller ', inject(function($controller) {
        var scope = {},
            ctrl = $controller('expensesEditCtrl', {$scope:scope});
        expect(ctrl).toBeTruthy;
    }));


    it('carController#getCar', inject(function($controller, CarsService) {
        var scope = {},
            ctrl = $controller('carController', {$scope:scope});
        CarsService.show = function(id, callback) { callback({car: {make:'reno',model:'clio',registration:'02d01', current_gps_statistic:{kmh:50.0,latitude:50.5,longitude:50}}}) }
        scope.getCar(1);
        expect(scope.car).toBeTruthy;
    }))

    it('carController#getCars', inject(function($controller) {
        var scope = {},
            ctrl = $controller('MainCtrl', {$scope:scope});
        scope.differenceInDays(new Date(),'Service','01d01',2)
        expect(scope.alerts.length).toEqual(1)

    }))

    it('should clear the date field ', inject(function($controller) {
        var scope = {},
            ctrl = $controller('expensesEditCtrl', {$scope:scope});
        scope.clear()
        expect(scope.dt).toEqual(null)

    }))
    it('should create todays date ', inject(function($controller) {
        var scope = {},
            ctrl = $controller('expensesEditCtrl', {$scope:scope});
        scope.today()
        expect(scope.dt).toEqual(new Date())

    }))

    it('should have date options defined', inject(function($controller) {
        var scope = {},
            ctrl = $controller('expensesEditCtrl', {$scope:scope});
        expect(scope.dateOptions).toBeTruthy()

    }))
    it('should have formats defined', inject(function($controller) {
        var scope = {},
            ctrl = $controller('expensesEditCtrl', {$scope:scope});
        expect(scope.formats).toBeTruthy()

    }))
    it('should have defined scope variables', inject(function($controller) {
        var scope = {},
            ctrl = $controller('carController', {$scope:scope});
        expect(scope.haveDiagnosticData).toBe(false)
        expect(scope.haveGpsData).toBe(false)
    }))

    it('should have collapsed set to false', inject(function($controller) {
        var scope = {},
            ctrl = $controller('fuelController', {$scope:scope});
        scope.CollapseDemoCtrl();
        expect(scope.isCollapsed).toBe(false)
    }))

    it('should get a car in fuelCtrl', inject(function($controller, CarsService) {
        var scope = {},
            ctrl = $controller('fuelController', {$scope:scope});
        CarsService.show = function(id, callback) { callback({car: {make:'reno',model:'clio',registration:'02d01', current_gps_statistic:{kmh:50.0,latitude:50.5,longitude:50}}}) }
        getCar(1);
        expect(scope.car).toBeTruthy;
    }))

    it('should have chart config data', inject(function($controller) {
        var scope = {},
            ctrl = $controller('fuelController', {$scope:scope});
        expect(scope.chartConfig).toBeTruthy()
    }))

    it('should remove alerts', inject(function($controller) {
        var scope = {},
            ctrl = $controller('fuelController', {$scope:scope});
        scope.removeAlerts();
        expect(scope.alerts.length).toBe(0)
    }))

    it('should have defined options for lists', inject(function($controller) {
        var scope = {},
            ctrl = $controller('fuelController', {$scope:scope});
        expect(scope.options).toBeTruthy()
        expect(scope.optionsFuel).toBeTruthy()
    }))

    it('should get a car for fuel edit page', inject(function($controller, CarsService) {
        var scope = {},
            ctrl = $controller('fuelEditCtrl', {$scope:scope});
        CarsService.show = function(id, callback) { callback({car: {make:'reno',model:'clio',registration:'02d01', current_gps_statistic:{kmh:50.0,latitude:50.5,longitude:50}}}) }
        getCar(1);
        expect(scope.car).toBeTruthy;
    }))

});
