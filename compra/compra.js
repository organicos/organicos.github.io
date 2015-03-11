'use strict';

var compra = angular.module('myApp.compra', ['ngRoute']);

compra.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/compra', {
    templateUrl: 'compra/new_basket.html',
    controller: 'HomeCtrl'
  });
  $routeProvider.when('/new_basket', {
    templateUrl: 'compra/new_basket.html',
    controller: 'HomeCtrl'
  });
  $routeProvider.when('/add_products', {
    templateUrl: 'compra/add_products.html',
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