'use strict';

var about = angular.module('myApp.about', ['ngRoute']);

about.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/about', {
    templateUrl: '/partials/about/about.html',
    controller: 'AboutCtrl'
  });
}]);

about.controller('AboutCtrl', ['$scope', function($scope) {

}]);