'use strict';

angular.module('myApp').factory('accessLevelManagerFactory', ['$scope', '$http', '$httpProvider', function Manager($scope, $http, $httpProvider) {

    // Append the Authenticated hash to the header
    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
        
        return {
            'request': function (config) {
                
                config.headers = config.headers || {};
                if ($localStorage.user && $localStorage.user.token) {
                  config.headers.Authorization = 'Organic ' + $localStorage.user.token;
                }
                return config;
            },
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                  $location.path('/signin');
                }
                return $q.reject(response);
            }
        };
    }]);
    
}]);

