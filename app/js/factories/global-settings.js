angular.module('fleetonrails.factories.global-settings', [])

    .factory('globalSettings', [function () {
        return {
            api_base_url : 'http://fleet-api.raven.com',
            api_client_id : '7236d09f6fd8210ea98914b603cbf4b3b10f6ef3ad8ad308e9f24b4a326cabb4',
            api_client_secret : '6080523131ac5b51fd73bd1bfe073658de7684b1d497cff6c789d0b8adf17a82'
        };
    }]);