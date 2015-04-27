'use strict';

angular.module('myApp').factory('accessLevelManagerFactory', ['$http', '$httpProvider', function Manager($http, $httpProvider) {

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
    
    $scope.$watch(function() { return $location.path(); }, function(newValue, oldValue){
        
        var privateRoutes = [
            '/me'
            , '/order_review'
            , '/admin_panel'
            , '/users'
            , '/products'
            , '/orders'
            , '/articles'
        ];

        if(privateRoutes.indexOf(newValue) > -1){

            if ($scope.$storage.user.token){
                
                $scope.ping(function (err, res) {

                    if(err) { // is not logged anymore. invalid token
                    
                        $location.path('/signin'+newValue);
                        
                    }

                });
                
            } else {
                
                $location.path('/signin'+newValue);
                    
            } 
        
        }
 
    });

}]);

