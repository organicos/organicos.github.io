'use strict';

var users = angular.module('myApp.users', ['ngRoute']);

users.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/eu', {
        templateUrl: '/partials/users/me.html',
        controller: 'MeCtrl'
    })
    .when('/alterar-senha', {
        templateUrl: '/partials/users/change_password.html',
        controller: 'ChangePasswordCtrl'
    })
    .when('/usuarios', {
        templateUrl: '/partials/users/users.html',
        controller: 'AdminUsersCtrl'
    })
    .when('/usuario/:id', {
        templateUrl: '/partials/users/user.html',
        controller: 'AdminUserCtrl'
    });
}]);

users.controller('AdminUserCtrl', ['$scope','$http', '$routeParams', 'myConfig', function($scope, $http, $routeParams, myConfig) {
  
    $scope.user = {};
    $scope.processingUserUpdate = false;
    
    $http.get(myConfig.apiUrl+'/user/'+$routeParams.id)
    .success(function(res) {
    
        $scope.user = res;
    
    }).error(function(err) {
    
        console.error('ERR', err);
    
    });
    
    $scope.updateUser = function(){
        
        $scope.processingUserUpdate = true;
        
        $http.put(myConfig.apiUrl+'/user/'+$scope.user._id, $scope.user)
        .success(function(res) {
            
        
            $scope.$storage.user = res;
    
            $scope.$emit('alert', {
                kind: 'success',
                msg: ['Dados salvos!'],
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
              title: "Sua alteração precisa ser revisada. Verifique os motivos abaixo:"
            });  
        
        }).finally(function(){

            $scope.processingUserUpdate = false;

        });
        
    }


  
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

users.controller('MeCtrl', ['$scope', '$localStorage', '$http', 'myConfig', function($scope, $localStorage, $http, myConfig) {
    $scope.user = {};
    $scope.processingUserUpdate = false;
    
    $http.get(myConfig.apiUrl+'/me')
    .success(function(res) {
        
        $localStorage.user = res.data;
        
        $scope.user = $localStorage.user;
        
    }).error(function(err) {
    
        console.error('ERR', err);
    
    });
    
    $scope.updateUser = function(){
        
        $scope.processingUserUpdate = true;
        
        $http.put(myConfig.apiUrl+'/user/'+$scope.user._id, $scope.user)
        .success(function(res) {
            
        
            $localStorage.user = res;
    
            $scope.$emit('alert', {
                kind: 'success',
                msg: ['Dados salvos!'],
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
              title: "Sua alteração precisa ser revisada. Verifique os motivos abaixo:"
            });  
        
        }).finally(function(){

            $scope.processingUserUpdate = false;

        });
        
    }
    
}]);