angular.module('fleetonrails.services.groups_users-service', [])

    .factory('GroupsUsersService', [ '$http', 'globalSettings', function($http, globalSettings) {
        return {
            get: function(id,success, error) {
                $http({
                    method: 'GET',
                    url: globalSettings.api_base_url + '/v1/groups/' + id + '/users',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function(users){
                        success(users);
                    }).error(function(users) {
                        error(users)
                        console.log(users);
                    })
            },

            create: function(id,user_id,data, success, error) {
                $http({
                    method: 'PUT',
                    url: globalSettings.api_base_url + '/v1/groups/' + id + '/users/' + user_id,
                    data: data,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function(users) {
                        success(users);
                    }).error(function(users) {
                        error(users)
                        console.log(users);
                    })
            },
            delete: function(id,usersID, success, error) {
                $http({
                    method: 'DELETE',
                    url: globalSettings.api_base_url + '/v1/groups/' + id + '/users/' + usersID,
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).success(function(users) {
                        success(users);
                    }).error(function(users) {
                        error(users);
                        console.log(users);
                    })
            }
        }
    }]);