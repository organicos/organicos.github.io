'use strict';

var order = angular.module('myApp.order', ['ngRoute']);

order.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/order_review', {
    templateUrl: 'partials/order/order_review.html',
    controller: 'OrderReviewCtrl'
  });
}]);

order.controller('OrderReviewCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', function($scope, $http, $filter, $routeParams, myConfig) {
  
    $scope.country = 'Brasil';
    $scope.orderReady = false;
    $scope.inactive_products = [];
    
    $http.post(myConfig.apiUrl + '/order_review', {
        basket: $scope.$storage.basket
    })
    .success(function(basket) {
        
        $scope.orderReady = true;
        $scope.$storage.basket.products = basket.products;
        $scope.$storage.basket.total = basket.total;
    
    }).error(function(err) {
        
        if(err.inactive_products.length > 0){
            
            $scope.$storage.basket.products = err.products;
            $scope.$storage.basket.total = err.total;
            $scope.inactive_products = err.inactive_products;
            $scope.orderReady = true;
            
            var error_list = [];

            angular.forEach(err.inactive_products, function(error, path) {
             this.push(error.name);
            }, error_list);
          
            $scope.$emit('alert', {
              kind: 'danger',
              title: "Infelizmente, os produtos abaixo não estão mais disponíveis:",
              msg: error_list
            });

        } else {
            
          var error_list = [];
    
          angular.forEach(err.errors, function(error, path) {
            this.push(error.message);
          }, error_list);
          
          $scope.$emit('alert', {
              kind: 'danger',
              msg: error_list,
              title: "Seu pedido precisa ser revisado. Verifique os motivos abaixo:"
          });            
            
        }
    
    });
    
    $scope.$watch('cep', function(newValue, oldValue) {
      
      var cep = newValue ? newValue.match(/\d+/) : '';

      if(cep.toString().length == 8){
        
        $http.jsonp('//api.postmon.com.br/v1/cep/'+cep+'?callback=JSON_CALLBACK')
        .success(function(res) {
          
          $scope.street = res.logradouro || '';
          $scope.district = res.bairro || '';
          $scope.city = res.cidade || '';
          $scope.state = res.estado || '';
        
        })
        .error(function(err) {
        
            console.error('ERR', err);
        
        });
        
      }

    });

}]);