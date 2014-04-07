angular.module('fleetonrails.factories.global-settings', [])

    .factory('globalSettings', [function () {
        return {
            api_base_url : 'http://fleet-api.raven.com',
            api_client_id : '9a5041448175859d83cf52ac6288d6e1efabaa0a9b38a05372ab5d0bbb8d3eb2',
            api_client_secret : 'c946679d639be722f01aa9f74cc2309cb959a074170dc7a07c58b329c88917c2'
        };
    }]);