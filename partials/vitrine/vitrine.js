'use strict';

var vitrine = angular.module('myApp.vitrine', ['ngRoute']);

vitrine.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/vitrine', {
    templateUrl: 'partials/vitrine/vitrine.html',
    controller: 'VitrineCtrl'
  });
}]);

vitrine.controller('VitrineCtrl', ['$scope','$http', function($scope, $http) {
	var VitrineCtrl = this;
	VitrineCtrl.products = [];
  // http://104.154.82.56/api/products - URL do recurso
  $http.get('partials/vitrine/destaques.json').then(function(resp) {
      VitrineCtrl.products = resp.data;
  }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
  });
}]);