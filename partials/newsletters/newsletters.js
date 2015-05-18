'use strict';

var newsletters = angular.module('myApp.newsletters', ['ngRoute']);

newsletters.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/newsletters', {
        templateUrl: '/partials/newsletters/newsletters.html',
        controller: 'AdminNewslettersCtrl'
    })
    .when('/newsletter/:id', {
        templateUrl: '/partials/newsletters/newsletter.html',
        controller: 'AdminNewsletterCtrl'
    })
    .when('/newsletter', {
        templateUrl: '/partials/newsletters/newsletter.html',
        controller: 'AdminNewsletterCtrl'
    });
}]);

newsletters.controller('AdminNewslettersCtrl', ['$scope','$http', 'myConfig', function($scope, $http, myConfig) {

    $scope.newsletters = [];
    $scope.newsletterFormModalObject = {};
    
    $http.get(myConfig.apiUrl+'/newsletters').then(function(res) {
    
        $scope.newsletters = res.data;
        
    }, function(err) {
    
        console.error('ERR', err);
    
    });

}]);

newsletters.controller('AdminNewsletterCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', function($scope, $http, $filter, $routeParams, myConfig) {

    $scope.loadingProducts = false;
    $scope.savingNewsletter = false;
    $scope.newsletter = {
        title: ""
        , top: ""
        , bottom: ""
        , sections: [{
            title: ""
            , top: ""
            , bottom: ""
            , products: []
            , articles: []
        }]
    };

    if($routeParams.id){

        $http.get(myConfig.apiUrl+'/newsletter/'+$routeParams.id)
        .success(function(res) {
        
            $scope.newsletter = res;
            
            $scope.divideSectionProductsListTouseInTable();
            
        }).error(function(err) {
        
            console.error('ERR', err);
        
        });
        
    }
    
    $scope.divideSectionProductsListTouseInTable = function(){
      
      return true;
      
    }
    
    $scope.addNewSection = function(){
        
        var newSection = {
            title: ""
            , top: ""
            , bottom: ""
            , products: []
            , newsletters: []
        }
        
        $scope.newsletter.sections.push(newSection);
        
    }
    
  $scope.submitNewsletterForm = function () {
    
    $scope.savingNewsletter = true;
    
    if($scope.newsletter._id){
      
       $scope.newsletterPut($scope.newsletter);
      
    } else {

      $scope.newsletterPost($scope.newsletter); 

    }

  }
  
  $scope.newsletterPost = function(article) {
    
    $http.post(myConfig.apiUrl + '/newsletter', article)
    .success(function(resp) {
      
        $scope.newsletter = resp.data;
        $location.path("/newsletter/" + resp._id);
        
    })
    .error(function (resp) {
      
      var error_list = [];

      angular.forEach(resp.errors, function(error, path) {
        this.push(error.message);
      }, error_list);
      
      $scope.$emit('alert', {
          kind: 'danger',
          msg: error_list,
          title: "Não foi possível inserir a newsletter. Verifique o motivo abaixo:"
      });
  
    })
    .finally(function () {
      $scope.savingNewsletter = false;
    });
  
  };

  $scope.newsletterPut = function(newsletter) {
    
    $http.put(myConfig.apiUrl + '/newsletter/'+newsletter._id, newsletter)
    .success(function(res) {
      
      $scope.newsletter = res;

      $scope.$emit('alert', {
          kind: 'success',
          msg: '',
          title: "Newsletter editada com sucesso"
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
          title: "Não foi possível editar a newsletter. Verifique o motivo abaixo:"
      });
  
    })
    .finally(function () {
      $scope.savingNewsletter = false;
    });
  };
  
  $scope.getArticles = function(title){
    return $http.get(myConfig.apiUrl+'/articles', {
      params: {
        title: title
      }
    }).then(function(res) {
      
      return res.data;

    });
  }

  $scope.selectArticle = function (item, model, label, section) {
    
    var article = ($filter('filter')(section.articles, {_id: item._id}, false));
    
    if (!article[0]) {

      section.articles.push(item);
      
    }

  };
  
  $scope.dropArticle = function(article, section){
    var articleIndex = section.articles.indexOf(article);
    if (articleIndex >= 0) {
        section.articles.splice(articleIndex, 1);
    }
    var articleIndex = section.articles.indexOf(article._id);
    if (articleIndex >= 0) {
        section.articles.splice(articleIndex, 1);
    }
  };
    
  $scope.getProducts = function(name){
    return $http.get(myConfig.apiUrl+'/products', {
      params: {
        name: name
      }
    }).then(function(res) {
      
      return res.data;

    });
  }

  $scope.selectProduct = function (item, model, label, section) {
    
    var product = ($filter('filter')(section.products, {_id: item._id}, false));
    
    if (!product[0]) {

      section.products.push(item);
      
    }

  };
  
  $scope.dropProduct = function(product, section){
    var productIndex = section.products.indexOf(product);
    if (productIndex >= 0) {
        section.products.splice(productIndex, 1);
    }
    var productIndex = section.products.indexOf(product._id);
    if (productIndex >= 0) {
        section.products.splice(productIndex, 1);
    }
  };
}]);