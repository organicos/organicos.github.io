'use strict';

var payments = angular.module('myApp.payments', ['ngRoute']);

payments.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/payments', {
    templateUrl: 'partials/payments/payments.html',
    controller: 'PaymentsCtrl'
  });
  $routeProvider.when('/order_review', {
    templateUrl: 'partials/payments/order_review.html',
    controller: 'OrderReviewCtrl'
  });
  $routeProvider.when('/payments/:id', {
    templateUrl: 'partials/payments/payments.html',
    controller: 'PaymentsCtrl'
  });
}]);

payments.controller('OrderReviewCtrl', ['$scope', function ($scope) {

  $scope.DeliveryDayAndTimeOptions = [
    'Quinta-feira a tarde'
    , 'Quinta-feira a noite'
    , 'Sábado pela manhã'
    , 'Sábado a tarde'
  ];

}]);

payments.controller('OrderReviewCtrl', ['$scope','$http', '$filter', '$routeParams', function($scope, $http, $filter, $routeParams) {
  
    $scope.country = 'Brasil';
    
    function jsonp_callback(data){
      
      console.log('jsonpcall');
      
    }

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

payments.controller('PaymentsCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', function($scope, $http, $filter, $routeParams, myConfig) {

    $scope.payments = [];
    $scope.paymentFormModalObject = {};
    
    $http.get(myConfig.apiUrl+'/payments').then(function(res) {
    
        $scope.payments = res.data;
        
        $scope.paymentFormModalObject = ($filter('filter')($scope.payments, {_id: $routeParams.id}, false))[0];
    
    }, function(err) {
    
        console.error('ERR', err);
    
    });

}]);