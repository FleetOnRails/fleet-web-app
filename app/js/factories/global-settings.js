angular.module('fleetonrails.factories.global-settings', [])

    .factory('globalSettings', [function () {
        return {
            api_base_url : 'http://fleet-api.raven.com',
            api_client_id : '2abe8af97a1e45ee655b5f19d9fb4977990374c2a2895b4aaa6a9d80aa7edeeb',
            api_client_secret : '33d91b9efcea015b8acaff960ae49164c15da62ff895a253bbfd819b883ba5f6'
        };
    }]);