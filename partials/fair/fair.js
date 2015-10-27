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
  $routeProvider.when('/fair/category/:category', {
    templateUrl: '/partials/fair/fair.html',
    controller: 'FairCtrl'
  });
  $routeProvider.when('/feira/categoria/:category', {
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

fair.controller('FairCtrl', ['$scope','$http', '$routeParams', '$filter', '$location', 'myConfig', 'HtmlMetaTagService', function($scope, $http, $routeParams, $filter, $location, myConfig, HtmlMetaTagService) {
  
  HtmlMetaTagService.tag('title', 'Feira');
  
	$scope.products = [];
	$scope.selectedCategory = $routeParams.category ? $routeParams.category : '';
	$scope.selectedOrder = "name";
	$scope.loadingProducts = true;

  $http.get(myConfig.apiUrl + '/products')
  .success(function(resp) {
    
      $scope.products = resp;

  }).error(function(err) {
    
      console.error('ERR', err);

  }).finally(function(res){
    
    $scope.loadingProducts = false;
    
  });

  $scope.selectCategory = function (category) {
    var destination = category ? '/feira/categoria/' + category : '/feira';
    $location.path(destination);
    
  };

}]);

fair.controller('FairProductCtrl', ['$scope','$http', '$routeParams', '$filter', '$location', 'myConfig', 'HtmlMetaTagService', function($scope, $http, $routeParams, $filter, $location, myConfig, HtmlMetaTagService) {

	$scope.product = [];
	$scope.sameCategoryProducts = [];
	$scope.saving_product = false;
	$scope.loadingProduct = true;

  $http.get(myConfig.apiUrl + '/product/' + $routeParams.id)
  .success(function(resp) {
      HtmlMetaTagService.tag('title', resp.name);
      $scope.product = resp;
      $scope.loadingProduct = false;
      $scope.loadSameCategoryProducts(resp.categories);
  }).error(function(err) {
    $scope.loadingProduct = false;
    console.error('ERR', err);
  });
  
  $scope.loadSameCategoryProducts = function() {
    $http.get(myConfig.apiUrl + '/products', {params: {category: $scope.product.categories[0].name}})
    .success(function(res) {
        console.log(res);
        $scope.sameCategoryProducts = res;
    }).error(function(err) {
        console.error('ERR', err);
    });    
  }

}]);