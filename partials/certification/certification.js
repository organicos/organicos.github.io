'use strict';

var certification = angular.module('myApp.certification', ['ngRoute']);

certification.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/certification', {
    templateUrl: '/partials/certification/certification.html',
    controller: 'CertificationCtrl'
  });
}]);

certification.controller('CertificationCtrl', ['$scope', function($scope) {

}]);