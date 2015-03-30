'use strict';

var fair = angular.module('myApp.fair', ['ngRoute']);

fair.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/fair', {
    templateUrl: 'partials/fair/fair.html',
    controller: 'FairCtrl'
  });
  $routeProvider.when('/fair/product/:id', {
    templateUrl: 'partials/fair/product.html',
    controller: 'FairCtrl'
  });

}]);

fair.controller('FairCtrl', ['$scope','$http', '$routeParams', '$filter', '$location', 'myConfig', function($scope, $http, $routeParams, $filter, $location, myConfig) {
  
	$scope.products = [];
	$scope.saving_product = false;
	$scope.selectedCategory = '';
	$scope.selectedOrder = "name";
	$scope.productFormModalObject = {};
	

  $http.get(myConfig.apiUrl + '/products')
  .success(function(resp) {
    
      $scope.products = resp;

      $scope.productFormModalObject = ($filter('filter')($scope.products, {_id: $routeParams.id}, false))[0];
  
  }).error(function(err) {
    
      console.error('ERR', err);

  });

  
	if(!$scope.$storage.basket || !$scope.$storage.basket.products){
  	$scope.$storage.basket = {
  	  total: 0,
  	  name: 'Minha cesta',
  	  products: []
  	};	  
	};

  $scope.selectCategory = function (category) {
    
    $scope.selectedCategory = category;
    
  };

  $scope.addToBasket = function (product) {
    
    var basketProduct = ($filter('filter')($scope.$storage.basket.products, {_id: product._id}, false))[0];
    
    if(basketProduct){
      
      basketProduct.quantity = basketProduct.quantity >= 0 ? basketProduct.quantity : 1;
      
      basketProduct.quantity ++;
      
    }  else {

      product.quantity = 1;

      $scope.$storage.basket.products.push(product);

    }
    
    $scope.$storage.basket.total += parseFloat(product.price);
    
  };

  $scope.dropFromBasket = function (product) {
    
    var productIndex = $scope.$storage.basket.products.indexOf(product);

    if (productIndex >= 0) {
      
      $scope.$storage.basket.products.splice(productIndex, 1);
      
      $scope.$storage.basket.total -= parseFloat(product.price) * product.quantity;
      
    }

  };
  
}]);