'use strict';

var auth = angular.module('myApp.auth', ['ngRoute']);

auth.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/authenticate', {
    templateUrl: 'partials/auth/authenticate.html',
    controller: 'LoginCtrl'
  });
}]);

auth.controller('LoginCtrl', ['$scope', '$auth', function($scope, $auth) {

    $scope.authenticate = function(provider) {
        $auth.authenticate(provider);
    };

}]);