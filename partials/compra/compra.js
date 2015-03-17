'use strict';

var compra = angular.module('myApp.compra', ['ngRoute']);

compra.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/compra', {
    templateUrl: 'partials/compra/new_basket.html',
    controller: 'HomeCtrl'
  });
  $routeProvider.when('/new_basket', {
    templateUrl: 'partials/compra/new_basket.html',
    controller: 'HomeCtrl'
  });
  $routeProvider.when('/add_products', {
    templateUrl: 'partials/compra/add_products.html',
    controller: 'HomeCtrl'
  });
  $routeProvider.when('/confirmation', {
    templateUrl: 'partials/compra/confirmation.html',
    controller: 'HomeCtrl'
  });
  $routeProvider.when('/payment', {
    templateUrl: 'partials/compra/payment.html',
    controller: 'HomeCtrl'
  });
}]);

compra.controller('HomeCtrl', [function() {

}]);