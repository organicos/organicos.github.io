'use strict';

var blog = angular.module('myApp.blog', ['ngRoute']);

blog.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/blog', {
    templateUrl: 'partials/blog/blog.html',
    controller: 'BlogArticlesCtrl'
  });
  $routeProvider.when('/blog/:id', {
    templateUrl: 'partials/blog/article.html',
    controller: 'BlogArticleCtrl'
  });
}]);

blog.controller('BlogArticlesCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', function($scope, $http, $filter, $routeParams, myConfig) {

  $scope.articles = [];
  $scope.selectedFilter = '';
  $scope.selectedOrder = 'updated';

  $http.get(myConfig.apiUrl+'/articles')
  .success(function(res){
    
    $scope.articles = res;
    
  }).error(function(err) {
  
      $scope.$emit('alert', {
          kind: 'danger',
          msg: err,
          title: "Não foi possível acessar a lista de artigos. Verifique o motivo abaixo:"
      });
  
  });

  $scope.selectFilter = function (value) {
    
    $scope.selectedFilter = value;
    
  };
  
  $scope.selectOrder = function (order) {
    
    $scope.selectedOrder = order;
    
  };
  
}]);

blog.controller('BlogArticleCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', function($scope, $http, $filter, $routeParams, myConfig) {

  $scope.saving_article = false;
  $scope.article = {};

  if($routeParams.id){
    
    $http.get(myConfig.apiUrl+'/article/'+$routeParams.id)
    .success(function(res) {

      $scope.article = res;

    }).error(function(err) {
    
        $scope.$emit('alert', {
            kind: 'danger',
            msg: err,
            title: "Não foi possível acessar os dados do artigo. Verifique o motivo abaixo:"
        });
    
    });
    
  }
  
}]);