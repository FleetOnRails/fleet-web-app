angular.module('fleetonrails.factories.global-settings', [])

    .factory('globalSettings', [function () {
        return {
            api_base_url : 'http://fleet-api.raven.com',
            api_client_id : 'cd4413abd1c873926a1cc0f1c43eddee6898d2c736a87d2865cb8b01c014f0d9',
            api_client_secret : 'd760748dd82f1e8e46c113e59b7ee8d04b25d46750af73d78b3716d9e9f2e8ec'
        };
    }]);