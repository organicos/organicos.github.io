'use strict';

var order = angular.module('myApp.order', ['ngRoute']);

order.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/order_review', {
    templateUrl: 'partials/order/order_review.html',
    controller: 'OrderReviewCtrl'
  });
  $routeProvider.when('/order/:id', {
    templateUrl: 'partials/order/order.html',
    controller: 'OrderCtrl'
  });
  $routeProvider.when('/orders', {
    templateUrl: 'partials/order/orders.html',
    controller: 'OrdersCtrl'
  });
}]);

order.controller('OrdersCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', function($scope, $http, $filter, $routeParams, myConfig) {

    $scope.selectedFilterInvalidValue = false;
    $scope.selectedOrder = 'updated';
    $scope.orders = [];
    $scope.userFormModalObject = {};
    
    $http.get(myConfig.apiUrl+'/orders')
    .success(function(res) {
    
        $scope.orders = res;
        
        $scope.orderFormModalObject = ($filter('filter')($scope.orders, {_id: $routeParams.id}, false))[0];
    
    }).error(function(err) {
    
        console.error('ERR', err);
    
    });

    $scope.selectFilterInvalidValue = function(value){
      
      $scope.selectedFilterInvalidValue = value;
      
    }
    
  $scope.dropOrder = function(order){
      
    var confirmed = confirm('Deseja realmente excluir o produto ' + order._id + "?");
      
    if (confirmed) {

      $scope.saving_product = true;
        $http.delete(myConfig.apiUrl + '/order/' + order._id)
        .success(function() {
          $scope.$emit('alert', {
              kind: 'success',
              msg: [],
              title: "Ordem removida com sucesso!"
          });
          var order_index = $scope.orders.indexOf(order);
          $scope.orders.splice(order_index,1);
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
    
  };
    
}]);

order.controller('OrderCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', function($scope, $http, $filter, $routeParams, myConfig) {
  
  $scope.order
  
  $http.get(myConfig.apiUrl+'/order/'+$routeParams.id)
  .success(function(res) {
  
      $scope.order = res;
  
  }).error(function(err) {
  
      console.error('ERR', err);
  
  });
}]);

order.controller('OrderReviewCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', '$location', function($scope, $http, $filter, $routeParams, myConfig, $location) {
  
    $scope.country = 'Brasil';
    $scope.orderReady = false;
    $scope.inactive_products = [];
    $scope.DeliveryDayAndTimeOptions = [
      'Terça pela manhã',
      'Terça pela tarde',
      'Terça pela noite',
      'Sábado pela manhã',
      'Sábado pela tarde',
      'Sábado pela noite'
    ];
    
    $http.post(myConfig.apiUrl + '/order_review', {
        basket: $scope.$storage.basket
    })
    .success(function(basket) {
        
        $scope.orderReady = true;
        $scope.$storage.basket.products = basket.products;
        $scope.$storage.basket.total = basket.total;
    
    }).error(function(err) {
        
        if(err.inactive_products){
            
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

  $scope.processOrder = function(){
    
    $scope.country = 'Brasil';
    $scope.inactive_products = [];
    
    $http.post(myConfig.apiUrl + '/order', {
        basket: $scope.$storage.basket,
        shipping_data: {
          cep: $scope.cep,
          street: $scope.street,
          number: $scope.number,
          complement: $scope.complement,
          district: $scope.district,
          city: $scope.city,
          state: $scope.state,
          country: $scope.country,
          address_ref: $scope.address_ref,
          deliveryOption: $scope.deliveryOption
        }
    })
    .success(function(order) {
        
      $scope.$storage.basket.products = [];
      $scope.$storage.basket.total = 0;
      
      $location.path("/order/"+order._id);

      $scope.$emit('alert', {
        kind: 'success',
        title: "Pedido processado com sucesso.",
        msg: ['Seu pedido foi processado e já pode ser pago. Ao clicar no botão Pagar, você será direcionado para o site do Pagseguro para realizar uma compra segura e muito prática.']
      });
            
    }).error(function(err) {

      var error_list = [];

      angular.forEach(err.errors, function(error, path) {
        this.push(error.message);
      }, error_list);
      
      $scope.$emit('alert', {
          kind: 'danger',
          msg: error_list,
          title: "Seu pedido precisa ser revisado. Verifique os motivos abaixo:"
      });  
    
    });
    
  }

}]);


