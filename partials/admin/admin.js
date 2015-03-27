'use strict';

var payments = angular.module('myApp.payments', ['ngRoute']);

payments.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin_panel', {
    templateUrl: 'partials/admin/admin_panel.html',
    controller: 'AdminPanelCtrl'
  });
}]);

payments.controller('AdminPanelCtrl', ['$scope', function ($scope) {

    

}]);

payments.controller('AdminUserCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', function($scope, $http, $filter, $routeParams, myConfig) {

    $scope.payments = [];
    $scope.paymentFormModalObject = {};
    
    $http.get(myConfig.apiUrl+'/payments').then(function(res) {
    
        $scope.payments = res.data;
        
        $scope.paymentFormModalObject = ($filter('filter')($scope.payments, {_id: $routeParams.id}, false))[0];
    
    }, function(err) {
    
        console.error('ERR', err);
    
    });

}]);