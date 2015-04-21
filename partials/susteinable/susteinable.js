'use strict';

var susteinable = angular.module('myApp.susteinable', ['ngRoute']);

susteinable.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/susteinable', {
    templateUrl: '/partials/susteinable/susteinable.html',
    controller: 'SusteinableCtrl'
  });
}]);

susteinable.controller('SusteinableCtrl', ['$scope', function($scope) {

}]);