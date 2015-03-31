'use strict';

var articles = angular.module('myApp.articles', ['ngRoute']);

articles.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/articles', {
    templateUrl: 'partials/articles/articles.html',
    controller: 'ArticlesCtrl'
  });
  $routeProvider.when('/article', {
    templateUrl: 'partials/articles/article.html',
    controller: 'ArticleCtrl'
  });
  $routeProvider.when('/article/:id', {
    templateUrl: 'partials/articles/article.html',
    controller: 'ArticleCtrl'
  });
}]);

articles.controller('ArticlesCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', function($scope, $http, $filter, $routeParams, myConfig) {

  $scope.articles = [];
  $scope.selectedFilterValue = '';
  $scope.selectedFilterField = 'category';
  $scope.selectedOrder = 'name';

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

  $scope.selectFilter = function (field, value) {
    
    $scope.selectedFilterField = field;
    $scope.selectedFilterValue = value;
    
  }
  
}]);

articles.controller('ArticleCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', function($scope, $http, $filter, $routeParams, myConfig) {

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

  $scope.articleFormSubmit = function () {
    
    $scope.saving_article = true;
    
    if($scope.article._id){
      
       $scope.articlePut($scope.article);
      
    } else {

      $scope.articlePost($scope.article); 

    }

  }
  
  $scope.articlePost = function(article) {
    
    $http.post(myConfig.apiUrl + '/articles', article)
    .success(function(resp) {
      
        $scope.articles = resp.data;
        window.location = ("#/article/" + resp._id);
        
    })
    .error(function (resp) {
      
      var error_list = [];

      angular.forEach(resp.errors, function(error, path) {
        this.push(error.message);
      }, error_list);
      
      $scope.$emit('alert', {
          kind: 'danger',
          msg: error_list,
          title: "Não foi possível inserir o artigo. Verifique o motivo abaixo:"
      });
  
    })
    .finally(function () {
      $scope.saving_article = false;
    });
  
  };

  $scope.articlePut = function(article) {
    
    $http.put(myConfig.apiUrl + '/articles/'+article._id, article)
    .success(function(resp) {
      
      $scope.articles = resp.data;

      $scope.$emit('alert', {
          kind: 'success',
          msg: '',
          title: "Artigo editado com sucesso"
      });

    })
    .error( function(resp) {
      
      var error_list = [];

      angular.forEach(resp.errors, function(error, path) {
        this.push(error.message);
      }, error_list);
      
      $scope.$emit('alert', {
          kind: 'danger',
          msg: error_list,
          title: "Não foi possível inserir o artigo. Verifique o motivo abaixo:"
      });
  
    })
    .finally(function () {
      $scope.saving_article = false;
    });
  };
  
  $scope.dropArticle = function(article) {
    
    var confirmed = confirm('Deseja realmente excluir o artigo ' + article.name + "?");
      
    if (confirmed) {

      $scope.saving_article = true;
        $http.delete(myConfig.apiUrl + '/articles/' + article._id)
        .success(function() {
          window.location = ("#/fair");
        })
        .error(function (resp) {
          
          var error_list = [];
    
          angular.forEach(resp.errors, function(error, path) {
            this.push(error.message);
          }, error_list);
          
          $scope.$emit('alert', {
              kind: 'danger',
              msg: error_list,
              title: "Não foi possível inserir o artigo. Verifique o motivo abaixo:"
          });
    
      })
      .finally(function () {
        $scope.saving_article = false;
      });
      
    };
    
  };
  
}]);