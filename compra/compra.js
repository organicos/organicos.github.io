'use strict';

var compra = angular.module('myApp.compra', ['ngRoute']);

compra.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/compra', {
    templateUrl: 'compra/location.html',
    controller: 'HomeCtrl'
  });
  $routeProvider.when('/location', {
    templateUrl: 'compra/location.html',
    controller: 'HomeCtrl'
  });
  $routeProvider.when('/montar_cesta', {
    templateUrl: 'compra/montar_cesta.html',
    controller: 'HomeCtrl'
  });
  $routeProvider.when('/confirmation', {
    templateUrl: 'compra/confirmation.html',
    controller: 'HomeCtrl'
  });
  $routeProvider.when('/payment', {
    templateUrl: 'compra/payment.html',
    controller: 'HomeCtrl'
  });
}]);

compra.controller('HomeCtrl', [function() {

}]);