'use strict';

var payments = angular.module('myApp.payments', ['ngRoute']);

payments.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/payments', {
    templateUrl: '/partials/payments/payments.html',
    controller: 'PaymentsCtrl'
  });
  $routeProvider.when('/payments/:id', {
    templateUrl: '/partials/payments/payments.html',
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