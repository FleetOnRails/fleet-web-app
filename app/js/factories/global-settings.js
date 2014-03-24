angular.module('fleetonrails.factories.global-settings', [])

    .factory('globalSettings', [function () {
        return {
            api_base_url : 'http://fleet-api.raven.com',
            api_client_id : '73bb593a38b4dc659c189ec6749fc1fd323330b12d86f1f25f4e2d3575c8d1ac',
            api_client_secret : 'cbbbf066762f56a4b97f7f85791156d6f1a0bb2b0901fa4dae6285179faa13bd'
        };
    }]);