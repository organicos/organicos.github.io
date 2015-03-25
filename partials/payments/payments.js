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

  $scope.$storage.user.token

}]);

payments.controller('PaymentsCtrl', ['$scope','$http', '$filter', '$routeParams', function($scope, $http, $filter, $routeParams) {

    $scope.payments = [];
    $scope.paymentFormModalObject = {};
    
    $http.get('//fodev-api-vinagreti.c9.io/v1/payments').then(function(resp) {
    
        $scope.payments = resp.data;
        
        $scope.paymentFormModalObject = ($filter('filter')($scope.payments, {_id: $routeParams.id}, false))[0];
    
    }, function(err) {
    
        console.error('ERR', err);
    
    });

}]);