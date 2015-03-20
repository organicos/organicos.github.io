'use strict';

var feira = angular.module('myApp.feira', ['ngRoute']);

feira.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/feira', {
    templateUrl: 'partials/feira/feira.html',
    controller: 'FeiraCtrl'
  });
}]);

feira.controller('FeiraCtrl', ['$scope','$http', function($scope, $http) {

	$scope.products = [];

	$scope.basket = {
	  name: 'Minha cesta',
	  products: []
	};

  // http://104.154.82.56/api/products - URL do recurso
  $http.get('partials/feira/produtos.json').then(function(resp) {
    
      $scope.products = resp.data;
      
  }, function(err) {
    
      console.error('ERR', err);

  });
  
  $scope.addToBasket = function (product) {
    
    var productIndex = $scope.basket.products.indexOf(product);

    if (productIndex >= 0) {
      var productInBasket = $scope.basket.products[productIndex];
      productInBasket.quantity++;
    } else {
      product.quantity = 1;
      $scope.basket.products.push(product);
    }
    
  };

  
}]);