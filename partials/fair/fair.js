'use strict';

var fair = angular.module('myApp.fair', ['ngRoute', 'chart.js']);

fair.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/feira', {
    templateUrl: '/partials/fair/fair.html',
    controller: 'FairCtrl'
  });
  $routeProvider.when('/fair', {
    templateUrl: '/partials/fair/fair.html',
    controller: 'FairCtrl'
  });
  $routeProvider.when('/feira/:id', {
    templateUrl: '/partials/fair/product.html',
    controller: 'FairProductCtrl'
  });
  $routeProvider.when('/fair/:id', {
    templateUrl: '/partials/fair/product.html',
    controller: 'FairProductCtrl'
  });
}]);

fair.controller('FairCtrl', ['$scope','$http', '$routeParams', '$filter', '$location', 'myConfig', function($scope, $http, $routeParams, $filter, $location, myConfig) {
  
	$scope.products = [];
	$scope.selectedCategory = '';
	$scope.selectedOrder = "name";

  $http.get(myConfig.apiUrl + '/products')
  .success(function(resp) {
    
      $scope.products = resp;

  }).error(function(err) {
    
      console.error('ERR', err);

  });

  $scope.selectCategory = function (category) {
    
    $scope.selectedCategory = category;
    
  };

}]);

fair.controller('FairProductCtrl', ['$scope','$http', '$routeParams', '$filter', '$location', 'myConfig', function($scope, $http, $routeParams, $filter, $location, myConfig) {

	$scope.product = [];
	$scope.sameCategoryProducts = [];
	$scope.saving_product = false;
	$scope.loadingProduct = true;

  $scope.pricesChartData = {
    series : ['Custo'],
    labels : [],
    data : []
  };

  $http.get(myConfig.apiUrl + '/product/' + $routeParams.id)
  .success(function(resp) {
    
      $scope.product = resp;
      
      $scope.updateProductCharts();
      
      $scope.loadingProduct = false;

  }).error(function(err) {
    
    $scope.loadingProduct = true;
    
    console.error('ERR', err);

  });

  $http.get(myConfig.apiUrl + '/products')
  .success(function(resp) {
    
      $scope.sameCategoryProducts = resp;

  }).error(function(err) {
    
      console.error('ERR', err);

  });
  
  $scope.updateProductCharts = function(){

    $scope.pricesChartData.data[0] = [];
    angular.forEach($scope.product.prices, function(price, key) {
      $scope.pricesChartData.data[0].unshift(price.price);
      $scope.pricesChartData.labels.unshift("R$");
    });
    
  }

}]);

// Optional configuration
fair.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colours: ['#FF5252'],
      responsive: true
    });
    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
      datasetFill: true
    });
}]);