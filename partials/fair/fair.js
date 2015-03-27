'use strict';

var fair = angular.module('myApp.fair', ['ngRoute']);

fair.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/fair', {
    templateUrl: 'partials/fair/fair.html',
    controller: 'FairCtrl'
  });
  $routeProvider.when('/product', {
    templateUrl: 'partials/fair/productFormModal.html',
    controller: 'FairCtrl'
  });
  $routeProvider.when('/product/:id', {
    templateUrl: 'partials/fair/productFormModal.html',
    controller: 'FairCtrl'
  });

}]);

fair.controller('FairCtrl', ['$scope','$http', '$routeParams', '$filter', '$location', 'myConfig', function($scope, $http, $routeParams, $filter, $location, myConfig) {
  
	$scope.products = [];
	$scope.saving_product = false;
	$scope.selectedCategory = '';
	$scope.productFormModalObject = {};
	$scope.categories = [
		'Frutas',
		'Verduras',
		'Legumes',
		'Temperos',
		'Grãos',
		'Farinhas e Cereais',
		'Geléias',
		'Óleos',
		'Conservas',
		'Bebidas',
		'Chás',
		'Pães',
		'Embalagens'
  ];
	if(!$scope.$storage.basket){
  	$scope.$storage.basket = {
  	  total: 0,
  	  name: 'Minha cesta',
  	  products: []
  	};	  
	}  

  $scope.selectCategory = function (category) {
    
    $scope.selectedCategory = category;
    
  }

  // http://104.154.82.56/api/products - URL do recurso
  //$http.get('//fodev-api-vinagreti.c9.io/v1/products').then(function(resp) {
  $http.get(myConfig.apiUrl + '/products').then(function(resp) {
    
      $scope.products = resp.data;

      $scope.productFormModalObject = ($filter('filter')($scope.products, {_id: $routeParams.id}, false))[0];
  
  }, function(err) {
    
      console.error('ERR', err);

  });
  
  $scope.dropProduct = function(product) {
    var confirmed = confirm('Deseja realmente excluir o produto ' + product.name + "?");
      
    if (confirmed) {

      $scope.saving_product = true;
        $http.delete(myConfig.apiUrl + '/products/' + product._id)
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
              title: "Não foi possível inserir o produto. Verifique o motivo abaixo:"
          });
    
      })
      .finally(function () {
        $scope.saving_product = false;
      });
      
    };
    
  }

  $scope.productModalFormSubmit = function () {
    
    $scope.saving_product = true;
    
    if($scope.productFormModalObject._id){
      
       $scope.productPut($scope.productFormModalObject);
      
    } else {

      $scope.productPost($scope.productFormModalObject); 

    }

  }
  
  $scope.productPost = function(product) {
    
    $http.post(myConfig.apiUrl + '/products', product)
    .success(function(resp) {
      
        $scope.products = resp.data;
        window.location = ("#/product/" + resp._id);
        
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
  }

  $scope.addToBasket = function (product) {
    
    var productIndex = $scope.$storage.basket.products.indexOf(product);

    if (productIndex >= 0) {

      $scope.$storage.basket.products[productIndex].quantity++;


    } else {

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