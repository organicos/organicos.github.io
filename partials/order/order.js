'use strict';

var currentTimestamp = new Date().getTime();

var order = angular.module('myApp.order', ['ngRoute']);

order.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/revisar-pedido', {
    templateUrl: '/partials/order/order_review.html' + '?' + currentTimestamp,
    controller: 'OrderReviewCtrl'
  });
  $routeProvider.when('/pedido/:id', {
    templateUrl: '/partials/order/order.html' + '?' + currentTimestamp,
    controller: 'OrderCtrl'
  });
  $routeProvider.when('/order/:id', {
    templateUrl: '/partials/order/order.html' + '?' + currentTimestamp,
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
    templateUrl: '/partials/users/order.html' + '?' + currentTimestamp,
    controller: 'OrderCtrl'
  });
  $routeProvider.when('/meus/pedidos', {
    templateUrl: '/partials/users/orders.html',
    controller: 'OrdersCtrl'
  });
}]);

var statuses = [
  {id: 0, name: 'Pagamento pendente', desc: 'Aguardando pagamento.'},
  {id: 1, name: 'Pago', desc: 'Aguardando entrega.'},
  {id: 2, name: 'Entregue', desc: 'Cesta entregue ao cliente.'},
  {id: 3, name: 'Cancelado', desc: 'Pedido cancelado por falta de pagamento.'},
  {id: 4, name: 'Problemas', desc: 'Problemas com o Pagseguro.'},
  {id: 5, name: 'Inválido', desc: 'Pedidos que não respeitam a política do negócio.'}
];

order.controller('OrdersCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', 'HtmlMetaTagService', '$modal', function($scope, $http, $filter, $routeParams, myConfig, HtmlMetaTagService, $modal) {
  
    HtmlMetaTagService.tag('title', 'Pedidos');
    $scope.checkAllStatus = false;
    $scope.orderByField = 'updated';
    $scope.orders = [];
    $scope.userFormModalObject = {};
    $scope.statuses = statuses;
    $scope.reverseSort = true;
    $http.get(myConfig.apiUrl+'/orders')
    .success(function(res) {
    
        $scope.orders = res;
        
        $scope.orderFormModalObject = ($filter('filter')($scope.orders, {_id: $routeParams.id}, false))[0];
    
    }).error(function(err) {
    
        console.error('ERR', err);
    
    });

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
  
  $scope.checkAllOrders = function(){
    angular.forEach($scope.orders, function(order, orderIndex) {
      $scope.orders[orderIndex].checked = $scope.checkAllStatus;
    });
  };
  
  $scope.showCheckedOrderProductsCondensed = function(){

    var condensedList = [];
    var checkedOrders = ($filter('filter')($scope.orders, {checked: true}, false));
    

    angular.forEach(checkedOrders, function(order, orderIndex) {
      angular.forEach(order.products, function(product, productIndex) {
        var productInCondensedList = ($filter('filter')(condensedList, {_id: product._id}, false))[0];
        if(productInCondensedList){
          var productInCondensedListIndex = condensedList.indexOf(productInCondensedList);
          condensedList[productInCondensedListIndex].quantity += product.quantity;
        }  else {
            condensedList.push(angular.copy(product));
        }
      });
    });


    return $modal.open({
      backdrop: true,
      keyboard: true,
      modalFade: true,
      size: 'lg',
      templateUrl: '/partials/order/order_condensed_modal.html',
      controller: function ($scope, $location, $modalInstance) {
        $scope.products = condensedList;
        $scope.modalOptions = {
          print: function (result) {
            $location.path('/printCondensedProductsList');
            $modalInstance.dismiss('print');
          },
          close: function (result) {
            $modalInstance.dismiss('cancel');
          }
        }
      }
    }).result;
  }
}]);

order.controller('OrderCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', 'confirmModalService', 'HtmlMetaTagService', '$modal', function($scope, $http, $filter, $routeParams, myConfig, confirmModalService, HtmlMetaTagService, $modal) {
  
  $scope.order = {};
  $scope.statuses = statuses;
  $scope.changingStatus = false;
  
  if($routeParams.id){

    $http.get(myConfig.apiUrl+'/order/'+$routeParams.id)
    .success(function(res) {
    
        HtmlMetaTagService.tag('title', 'Pedido ' + res._id);
    
        $scope.order = res;
  
    }).error(function(err, response) {
  
        if(response === 403) {
          
            $scope.$emit('alert', {
                kind: 'danger',
                msg: ['Você precisa se identificar para rever seu pedido!'],
                title: "Não foi possível carregar seu pedido. Verifique o motivo abaixo:"
            });  
          
        }
  
    });
    
  }

  $scope.orderTotal = function(){

    var total = 0;

    angular.forEach($scope.order.products, function(product, index){
      if(!product.unavaiable)
        total += product.prices[0].price * product.quantity;
    });

    return total;

  }

  $scope.refreshRefoundValue = function(){

    var total = 0;

    angular.forEach($scope.order.products, function(product, index){
      if(product.unavaiable){
        total += product.prices[0].price * product.quantity;
      }
    });

    if($scope.order.refound){
      $scope.order.refound.value = total;
    }

    return total;

  }

  $scope.changeStatus = function(newStatus, oldStatus){

    var hasRefound = $scope.refreshRefoundValue() > 0 ;
    var refounOptionNotSelected = $scope.order.refound.option.length == 0;

    if(hasRefound && refounOptionNotSelected){

      $scope.$emit('alert', {
        kind: 'danger',
        title: 'Alguns produtos não foram entregues.',
        msg: ['Selecione a forma de reembolso antes de continuar.']
      });

      $scope.order.status = oldStatus;

      return false;

    }

    $scope.changingStatus = true;

    var modalOptions = {
        closeButtonText: 'Cancelar',
        actionButtonText: 'Alterar status do pedido',
        actionButtonKind: 'btn-danger',
        headerText: 'Alterar status do pedido para ' + statuses[$scope.order.status].name + "?",
        bodyText: 'Deseja realmente alterar status do pedido para ' + statuses[$scope.order.status].name + "?"
    };

    confirmModalService.showModal({}, modalOptions)
    .then(function (confirmed) {
      
      if(confirmed){

        $scope.order.status = $scope.order.status;
        
        $http.put(myConfig.apiUrl + '/order/'+$scope.order._id, $scope.order)
        .success(function(res) {
    
          $scope.$emit('alert', {
              kind: 'success',
              msg: '',
              title: "Ordem editada com sucesso"
          });
    
        })
        .error( function(resp) {

          $scope.order.status = oldStatus;
          
          var error_list = [];
    
          angular.forEach(resp.errors, function(error, path) {
            this.push(error.message);
          }, error_list);
          
          $scope.$emit('alert', {
              kind: 'danger',
              msg: error_list,
              title: "Não foi possível editar seu pedido. Verifique o motivo abaixo:"
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

  $scope.showDepositInstructionsModal = function(){
    
      return $modal.open({
          backdrop: true,
          keyboard: true,
          modalFade: true,
          size: 'md',
          templateUrl: '/partials/order/deposit_instructions.html',
          controller: function ($scope, $location, $modalInstance) {
              $scope.modalOptions = {
                  close: function (result) {
                      $modalInstance.dismiss('cancel');
                  }
              };
          }
      }).result;
  };
    
  $scope.checkPagseguroPayment = function(order_id){
    $http.get(myConfig.apiUrl+'/check_pagseguro_payment/'+order_id)
    .success(function(res) {
    
        $scope.order = res;
    
    }).error(function(err) {
    
        console.error('ERR', err);
    
    });
  };
  
}]);

order.controller('OrderReviewCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', '$location', 'HtmlMetaTagService', function($scope, $http, $filter, $routeParams, myConfig, $location, HtmlMetaTagService) {
  
    HtmlMetaTagService.tag('title', 'Revisão de pedido');
  
    $scope.showPreferencesForm = true;
    $scope.showShippingForm = true;
    $scope.processingOrder = false;
    $scope.country = 'Brasil';
    $scope.orderReady = false;
    $scope.inactive_products = [];
    $scope.shipping = {
      nextDates: []
      , locations: []
    };

    $http.post(myConfig.apiUrl + '/order_review', {
        basket: $scope.$storage.basket
    })
    .success(function(basket) {
        
        $scope.$storage.basket.products = basket.products;
        $scope.$storage.basket.total = basket.total;
    
    }).error(function(err, response) {
      
      if(response === 403) {
        
          $scope.$emit('alert', {
              kind: 'danger',
              msg: error_list,
              title: "Você precisa se identificar para rever seu pedido!"
          });  
        
      } else {
        
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
        
      }
        
    })
    .finally(function(){
      $scope.orderReady = true;
    });
    
    $http.get(myConfig.apiUrl + '/shipping/next')
    .success(function(res) {

      var myDateExists = res.indexOf($scope.$storage.basket.shipping.date) > -1;

      if(!myDateExists){
        
        $scope.$storage.basket.shipping.date = "";
        
      }
      
      $scope.shipping.nextDates = res;
      
    })
    .error(function(err) {
    
        console.error('ERR', err);
    
    });
        
    $http.get(myConfig.apiUrl + '/shipping/locations')
    .success(function(res) {

      var city = $scope.$storage.basket.shipping.city;
      
      var myLocation = $filter('filter')(res, { city:  city}, true);

      if(myLocation.length){
        
        $scope.$storage.basket.shipping.price = myLocation[0].price;
        
      } else {
        
        $scope.$storage.basket.shipping.city = "";
        $scope.$storage.basket.shipping.price = "";
        
      }
      
      $scope.shipping.locations = res;
      
    })
    .error(function(err) {
    
        console.error('ERR', err);
    
    });
    
    $scope.UpdateCityAndShippingPrice = function(){
      $scope.$storage.basket.shipping.city = $scope.$storage.basket.shipping.location ? $scope.$storage.basket.shipping.location.city : "";
      $scope.$storage.basket.shipping.state = $scope.$storage.basket.shipping.location ? $scope.$storage.basket.shipping.location.state : "";
      $scope.$storage.basket.shipping.price = $scope.$storage.basket.shipping.location ? $scope.$storage.basket.shipping.location.price : "";
    }
    
    $scope.$watch('$storage.basket.shipping.cep', function(newValue, oldValue) {
      
      var cep = newValue ? newValue.match(/\d+/) : '';
      
      if(cep.toString().length == 8){
        
        $http.jsonp('//api.postmon.com.br/v1/cep/'+cep+'?callback=JSON_CALLBACK')
        .success(function(res) {
          
          $scope.$storage.basket.shipping.street = res.logradouro || '';
          $scope.$storage.basket.shipping.district = res.bairro || '';

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
      
      $location.path("/meu/pedido/"+order._id);

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
    
    $scope.$storage.basket.total += parseFloat(product.prices[0].price);
    
  };

  $scope.dropFromBasket = function (product, decreasingAmount) {
    
    var productIndex = $scope.$storage.basket.products.indexOf(product);
    
    var product = $scope.$storage.basket.products[productIndex];

    if (productIndex >= 0) {

      if (decreasingAmount > 0 & product.quantity > decreasingAmount) {
        
        product.quantity -= decreasingAmount;
        
        $scope.$storage.basket.total -= product.prices[0].price * decreasingAmount;
        
      } else {
        
        $scope.$storage.basket.total -= parseFloat(product.prices[0].price) * product.quantity;
        
        $scope.$storage.basket.products.splice(productIndex, 1);   
        
      }
      
      
      
    }

  };

}]);


