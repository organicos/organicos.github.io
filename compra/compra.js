'use strict';

var compra = angular.module('myApp.compra', ['ngRoute'])

compra.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/compra', {
    templateUrl: 'compra/step_1.html',
    controller: 'CompraCtrl'
  });
}])

compra.controller('CompraCtrl', ['$scope','$http', function($scope, $http) {
	var CompraCtrl = this;
	CompraCtrl.products = [];
    // http://104.154.82.56/api/products - URL do recurso
    $http.get('compra/produtos.json').then(function(resp) {
        CompraCtrl.products = resp.data;
    }, function(err) {
        console.error('ERR', err);
        // err.status will contain the status code
    });
}]);