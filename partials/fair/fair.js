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

fair.controller('FairCtrl', ['$scope','$http', '$routeParams', '$filter', '$location', 'myConfig', 'HtmlMetaTagService', function($scope, $http, $routeParams, $filter, $location, myConfig, HtmlMetaTagService) {
  
  HtmlMetaTagService.tag('title', 'Feira');
  
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

fair.controller('FairProductCtrl', ['$scope','$http', '$routeParams', '$filter', '$location', 'myConfig', 'HtmlMetaTagService', function($scope, $http, $routeParams, $filter, $location, myConfig, HtmlMetaTagService) {

	$scope.product = [];
	$scope.sameCategoryProducts = [];
	$scope.saving_product = false;
	$scope.loadingProduct = true;

  $scope.pricesChartData = {
    series : ['Custo'],
    labels : [],
    data : [],
    options : {
      scaleLabel : "<%='R$' + Number(value).toFixed(2)%>"
      , showScale: true
      , tooltipTemplate: "<%='R$' + Number(value).toFixed(2)%>"
      , multiTooltipTemplate: "<%='R$' + Number(value).toFixed(2)%>"
    }
  };

  $http.get(myConfig.apiUrl + '/product/' + $routeParams.id)
  .success(function(resp) {
    
      HtmlMetaTagService.tag('title', resp.name);
    
      $scope.product = resp;
      
      $scope.updateProductCharts();
      
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

  $scope.updateProductCharts = function(){

    $scope.pricesChartData.data[0] = [];

    angular.forEach($scope.product.prices, function(price, key) {
      $scope.pricesChartData.data[0].unshift(price.price);
      $scope.pricesChartData.labels.unshift($filter('date')(price.date,'dd/MM/yyyy'));
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