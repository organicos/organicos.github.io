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
	  total: 0,
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

      $scope.basket.products[productIndex].quantity++;


    } else {

      product.quantity = 1;

      $scope.basket.products.push(product);

    }
    
    $scope.basket.total += parseFloat(product.price);
    
  };

  $scope.dropFromBasket = function (product) {
    
    var productIndex = $scope.basket.products.indexOf(product);

    if (productIndex >= 0) {
      
      $scope.basket.products.splice(productIndex, 1);
      
      $scope.basket.total -= parseFloat(product.price) * product.quantity;
      
    }

  };
  
  $scope.calculateBasketTotal = function () {
    
  };
  
}]);