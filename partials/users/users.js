'use strict';

var users = angular.module('myApp.users', ['ngRoute']);

users.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/users', {
    templateUrl: '/partials/users/users.html',
    controller: 'AdminUsersCtrl'
  });
  $routeProvider.when('/change_password', {
    templateUrl: '/partials/users/change_password.html',
    controller: 'ChangePasswordCtrl'
  });
}]);

users.controller('AdminUsersCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', function($scope, $http, $filter, $routeParams, myConfig) {

    $scope.users = [];
    $scope.userFormModalObject = {};
    
    $http.get(myConfig.apiUrl+'/users').then(function(res) {
    
        $scope.users = res.data;
        
        $scope.userFormModalObject = ($filter('filter')($scope.users, {_id: $routeParams.id}, false))[0];
    
    }, function(err) {
    
        console.error('ERR', err);
    
    });

}]);

users.controller('ChangePasswordCtrl', ['$scope','$http', 'myConfig', '$localStorage', function($scope, $http, myConfig, $localStorage) {

    $scope.processingChangePassword = false;
    
    $scope.submitChangePassword = function() {
        
        $scope.processingChangePassword = true;

        $http.post(myConfig.apiUrl+'/changePassword',{
            password: $scope.password,
            newPassword: $scope.new_password,
            newPasswordHint: $scope.new_password_hint
        })
        .success(function(res) {
        
            $localStorage.user = res;

            $scope.$emit('alert', {
                kind: 'success',
                msg: ['A sua senha foi alterada!'],
                title: "Sucesso"
            });  
          
        }).error(function(err) {
            
            $scope.processingChangePassword = false;
        
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

    };

}]);