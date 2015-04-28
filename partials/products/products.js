'use strict';

var products = angular.module('myApp.products', ['ngRoute']);

products.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/produtos', {
    templateUrl: '/partials/products/products.html',
    controller: 'ProductsCtrl'
  });
  $routeProvider.when('/produto', {
    templateUrl: '/partials/products/product.html',
    controller: 'ProductCtrl'
  });
  $routeProvider.when('/produto/:id', {
    templateUrl: '/partials/products/product.html',
    controller: 'ProductCtrl'
  });
}]);

products.controller('ProductsCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', function($scope, $http, $filter, $routeParams, myConfig) {

  $scope.products = [];
  $scope.selectedFilterValue = '';
  $scope.selectedFilterField = 'category';
  $scope.selectedOrder = 'name';

  $http.get(myConfig.apiUrl+'/products')
  .success(function(res){
    
    $scope.products = res;
    
  }).error(function(err) {
  
      $scope.$emit('alert', {
          kind: 'danger',
          msg: err,
          title: "Não foi possível acessar a lista de produtos. Verifique o motivo abaixo:"
      });
  
  });

  $scope.selectFilter = function (field, value) {
    
    $scope.selectedFilterField = field;
    $scope.selectedFilterValue = value;
    
  }
  
}]);

products.controller('ProductCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', 'confirmModalService', '$location', function($scope, $http, $filter, $routeParams, myConfig, confirmModalService, $location) {

  $scope.saving_product = false;
  
  $scope.product = {};

  if($routeParams.id){
    
    $http.get(myConfig.apiUrl+'/product/'+$routeParams.id)
    .success(function(res) {

      $scope.product = res;

    }).error(function(err) {
    
        $scope.$emit('alert', {
            kind: 'danger',
            msg: err,
            title: "Não foi possível acessar os dados do produto. Verifique o motivo abaixo:"
        });
    
    });
    
  }

  $scope.producFormSubmit = function () {
    
    $scope.saving_product = true;
    
    if($scope.product._id){
      
       $scope.productPut($scope.product);
      
    } else {

      $scope.productPost($scope.product); 

    }

  }
  
  $scope.productPost = function(product) {
    
    $http.post(myConfig.apiUrl + '/products', product)
    .success(function(resp) {
      
        $scope.products = resp.data;
        $location.path("/produto/" + resp._id);
        
    })
    .error(function (resp) {
      
      var error_list = [];

      angular.forEach(resp.errors, function(error, path) {
        this.push(error.message);
      }, error_list);
      
      $scope.$emit('alert', {
          kind: 'danger',
          msg: error_list,
          title: "Não foi possível inserir o produto. Verifique o motivo abaixo:"
      });
  
    })
    .finally(function () {
      $scope.saving_product = false;
    });
  
  };

  $scope.productPut = function(product) {
    
    $http.put(myConfig.apiUrl + '/products/'+product._id, product)
    .success(function(resp) {
      
      $scope.products = resp.data;

      $scope.$emit('alert', {
          kind: 'success',
          msg: '',
          title: "Produto editado com sucesso"
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
          title: "Não foi possível inserir o produto. Verifique o motivo abaixo:"
      });
  
    })
    .finally(function () {
      $scope.saving_product = false;
    });
  };
  
  $scope.dropProduct = function(product) {

    var modalOptions = {
        closeButtonText: 'Cancelar',
        actionButtonText: 'Excluir produto',
        actionButtonKind: 'btn-danger',
        headerText: 'excluir o produto ' + product.name + "?",
        bodyText: 'Deseja realmente excluir o produto ' + product.name + "?"
    };

    confirmModalService.showModal({}, modalOptions)
    .then(function (result) {

      $http.delete(myConfig.apiUrl + '/products/' + product._id)
      .success(function() {
        $location.path("/produtos");
      })
      .error(function (resp) {
        
        var error_list = [];
  
        angular.forEach(resp.errors, function(error, path) {
          this.push(error.message);
        }, error_list);
        
        $scope.$emit('alert', {
            kind: 'danger',
            msg: error_list,
            title: "Não foi possível inserir o produto. Verifique o motivo abaixo:"
        });
  
      });

    });

  };

}]);