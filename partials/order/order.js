'use strict';

var order = angular.module('myApp.order', ['ngRoute']);

order.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/revisar-pedido', {
    templateUrl: '/partials/order/order_review.html',
    controller: 'OrderReviewCtrl'
  });
  $routeProvider.when('/pedido/:id', {
    templateUrl: '/partials/order/order.html',
    controller: 'OrderCtrl'
  });
  $routeProvider.when('/order/:id', {
    templateUrl: '/partials/order/order.html',
    controller: 'OrderCtrl'
  });
  $routeProvider.when('/pedidos', {
    templateUrl: '/partials/order/orders.html',
    controller: 'OrdersCtrl'
  });
  $routeProvider.when('/orders', {
    templateUrl: '/partials/order/orders.html',
    controller: 'OrdersCtrl'
  });
  $routeProvider.when('/meu/pedido/:id', {
    templateUrl: '/partials/users/order.html',
    controller: 'OrderCtrl'
  });
  $routeProvider.when('/meus/pedidos', {
    templateUrl: '/partials/users/orders.html',
    controller: 'OrdersCtrl'
  });
}]);

var statuses = [
  {name: 'Não pago', desc: 'Aguardando pagamento.'},
  {name: 'Pago', desc: 'Aguardando entrega.'},
  {name: 'Entregue', desc: 'Cesta entregue ao cliente.'}
];

order.controller('OrdersCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', function($scope, $http, $filter, $routeParams, myConfig) {

    $scope.selectedFilterInvalidValue = false;
    $scope.selectedOrder = 'updated';
    $scope.orders = [];
    $scope.userFormModalObject = {};
    $scope.statuses = statuses;
    $scope.selectedOrder = "updated";
    
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

order.controller('OrderCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', '$modal', 'confirmModalService', function($scope, $http, $filter, $routeParams, myConfig, $modal, confirmModalService) {
  
  $scope.order
  $scope.statuses = statuses;
  $scope.changingStatus = false;
  $scope.newStatus = 0;
  
  $scope.changeStatus = function(newStatus){
    
    $scope.changingStatus = true;

    var modalOptions = {
        closeButtonText: 'Cancelar',
        actionButtonText: 'Alterar status do pedido',
        actionButtonKind: 'btn-danger',
        headerText: 'Alterar status do pedido para ' + statuses[newStatus].name + "?",
        bodyText: 'Deseja realmente alterar status do pedido para ' + statuses[newStatus].name + "?"
    };

    confirmModalService.showModal({}, modalOptions)
    .then(function (confirmed) {
      
      if(confirmed){
        
        $http.put(myConfig.apiUrl + '/order/'+$scope.order._id, {status: newStatus})
        .success(function(res) {
          
          $scope.order.status = newStatus;
          $scope.newStatus = newStatus;
    
          $scope.$emit('alert', {
              kind: 'success',
              msg: '',
              title: "Ordem editada com sucesso"
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
              title: "Não foi possível editar a ordem. Verifique o motivo abaixo:"
          });
      
        })
        .finally(function () {
          $scope.changingStatus = false;
        });
        
      } else {
        
        $scope.changingStatus = false;
        
      }

    });
    
  };
  
  $http.get(myConfig.apiUrl+'/order/'+$routeParams.id)
  .success(function(res) {
  
      $scope.order = res;
      $scope.newStatus = res.status;

  }).error(function(err) {
  
      console.error('ERR', err);
  
  });
  
  $scope.checkPagseguroPayment = function(order_id){
    $http.get(myConfig.apiUrl+'/check_pagseguro_payment/'+order_id)
    .success(function(res) {
    
        $scope.order = res;
    
    }).error(function(err) {
    
        console.error('ERR', err);
    
    });
  };
  
}]);

order.controller('OrderReviewCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', '$location', function($scope, $http, $filter, $routeParams, myConfig, $location) {
  
    $scope.processingOrder = false;
    $scope.country = 'Brasil';
    $scope.orderReady = false;
    $scope.inactive_products = [];
    $scope.shipping = {
      nextDates: []
    };

    $http.post(myConfig.apiUrl + '/order_review', {
        basket: $scope.$storage.basket
    })
    .success(function(basket) {
        
        $scope.$storage.basket.products = basket.products;
        $scope.$storage.basket.total = basket.total;
    
    }).error(function(err) {
        
        if(err.inactive_products){
            
            $scope.$storage.basket.products = err.products;
            $scope.$storage.basket.total = err.total;
            $scope.inactive_products = err.inactive_products;

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
    
    })
    .finally(function(){
      $scope.orderReady = true;
    });
    
    $scope.shipping = {
      nextDates: []
    };
    
    $http.get(myConfig.apiUrl + '/shipping/next')
    .success(function(res) {
      
      $scope.shipping.nextDates = res;
      
    })
    .error(function(err) {
    
        console.error('ERR', err);
    
    });
        
    $scope.$watch('$storage.basket.shipping.cep', function(newValue, oldValue) {
      
      var cep = newValue ? newValue.match(/\d+/) : '';
      
      if(cep.toString().length == 8){
        
        $http.jsonp('//api.postmon.com.br/v1/cep/'+cep+'?callback=JSON_CALLBACK')
        .success(function(res) {
          
          $scope.$storage.basket.shipping.street = res.logradouro || '';
          $scope.$storage.basket.shipping.district = res.bairro || '';
          $scope.$storage.basket.shipping.city = res.cidade || '';
          $scope.$storage.basket.shipping.state = res.estado || '';
          $scope.$storage.basket.shipping.country = res.pais || 'Brasil';
          
        })
        .error(function(err) {
        
            console.error('ERR', err);
        
        });
        
      }

    });

  $scope.processOrder = function(){
    
    $scope.processingOrder = true;

    $http.post(myConfig.apiUrl + '/order', {
        basket: $scope.$storage.basket
    })
    .success(function(order) {
        
      $scope.$storage.basket.products = [];
      $scope.$storage.basket.total = 0;
      
      $location.path("/ordem/"+order._id);

      $scope.$emit('alert', {
        kind: 'success',
        title: "Pedido processado com sucesso.",
        msg: ['Seu pedido foi processado e já pode ser pago. Ao clicar no botão Pagar, você será direcionado para o site do Pagseguro para realizar uma compra prática e segura.'],
        duration: 0
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
    
    }).finally(function(){
      
      $scope.processingOrder = false;
      
    });
    
  };
  
  $scope.addToBasket = function (product) {
    
    var basketProduct = ($filter('filter')($scope.$storage.basket.products, {_id: product._id}, false))[0];
    
    if(basketProduct){
      
      basketProduct.quantity = basketProduct.quantity >= 0 ? basketProduct.quantity : 1;
      
      basketProduct.quantity ++;
      
    }  else {

      product.quantity = 1;

      $scope.$storage.basket.products.push(product);

    }
    
    $scope.$storage.basket.total += parseFloat(product.price);
    
  };

  $scope.dropFromBasket = function (product, decreasingAmount) {
    
    var productIndex = $scope.$storage.basket.products.indexOf(product);
    
    var product = $scope.$storage.basket.products[productIndex];

    if (productIndex >= 0) {

      if (decreasingAmount > 0 & product.quantity > decreasingAmount) {
        
        product.quantity -= decreasingAmount;
        
        $scope.$storage.basket.total -= product.price * decreasingAmount;
        
      } else {
        
        $scope.$storage.basket.total -= parseFloat(product.price) * product.quantity;
        
        $scope.$storage.basket.products.splice(productIndex, 1);   
        
      }
      
      
      
    }

  };

}]);


