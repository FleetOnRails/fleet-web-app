angular.module('fleetonrails.factories.global-settings', [])

    .factory('globalSettings', [function () {
        return {
            api_base_url : 'http://fleet-api.raven.com',
            api_client_id : '0a53466ed458c313ba5ee4d555b3e5a8ab76c36a66adbfcd3af54bd3ed1cec02',
            api_client_secret : '86438505b551e5ee6882449041ba74c4e00cb2ad2107ad0eddfce7838993136e'
        };
    }]);