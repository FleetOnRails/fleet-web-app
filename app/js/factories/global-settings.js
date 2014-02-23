angular.module('fleetonrails.factories.global-settings', [])

    .factory('globalSettings', [function () {
        return {
            api_base_url : 'http://fleet-api.raven.com',
            api_client_id : 'b3ddf4ad5757dee76e7eb051cecf6b9b1221016432823bbfd34953347c4960f6',
            api_client_secret : 'ae5873581a055c2ec35b3e95e669923c0a95e330d4bf70ae111cda4076756a23'
        };
    }]);