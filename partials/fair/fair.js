'use strict';

var fair = angular.module('myApp.fair', ['ngRoute']);

fair.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/feira', {
    templateUrl: '/partials/fair/fair.html',
    controller: 'FairCtrl'
  });
  $routeProvider.when('/fair', {
    templateUrl: '/partials/fair/fair.html',
    controller: 'FairCtrl'
  });
  $routeProvider.when('/feira/produto/:id', {
    templateUrl: '/partials/fair/product.html',
    controller: 'FairCtrl'
  });
  $routeProvider.when('/fair/product/:id', {
    templateUrl: '/partials/fair/product.html',
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

  $scope.selectCategory = function (category) {
    
    $scope.selectedCategory = category;
    
  };

}]);