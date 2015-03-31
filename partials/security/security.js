'use strict';

var security = angular.module('myApp.security', ['ngRoute']);

security.config(['$routeProvider', function ($routeProvider) {
 
    $routeProvider.
        when('/signin', {
            templateUrl: 'partials/security/signin.html'
        }).
        when('/signin/:return_url', {
            templateUrl: 'partials/security/signin.html'
        }).
        when('/me', {
            templateUrl: 'partials/security/me.html',
            controller: 'SecurityCtrl'
        }).
        when('/logout', {
            templateUrl: 'partials/security/signin.html',
            controller: 'LogoutCtrl'
        });
        
}]);

security.controller('LogoutCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.$storage.user = {};
    
    $location.path("#/signin");

}]);

security.controller('SigninCtrl', ['$scope', '$location', '$routeParams','$http', 'myConfig', function ($scope, $location, $routeParams, $http, myConfig) {
    
    $scope.processingSignInUp = false;
    
    $scope.signin = function() {
        
        $scope.processingSignInUp = true;
        
        var formData = {
            email: $scope.email,
            password: $scope.password
        };

        $http.post(myConfig.apiUrl+'/signin', formData)
        .success(function (res) {
            $scope.$storage.user = res.data;
            $location.path($routeParams.return_url || "#/me");
        })
        .error(function (err) {
            $scope.$emit('alert', {
                kind: 'danger',
                msg: err,
                title: "Falha:"
            });
        })
        .finally(function(){
            
            $scope.processingSignInUp = false;
            
        });
    };
    
}]);

security.controller('SignupCtrl', ['$scope', '$http', '$location', '$routeParams', 'myConfig', function ($scope, $http, $location, $routeParams, myConfig) {
    
    $scope.processingSignInUp = false;

    $scope.signup = function() {
        
        $scope.processingSignInUp = true;
        
        var formData = {
            name: $scope.name,
            email: $scope.email,
            password: $scope.password,
            password_hint: $scope.password_hint
        };
        
        if($scope.name && $scope.email && $scope.password && $scope.password_hint){
            
            if($scope.password == $scope.password_hint){

                $http.post(myConfig.apiUrl+'/signup', formData)
                .success(function (res) {
                    $scope.$storage.user = res.data;
                    $location.path($routeParams.return_url || "#/me");
                })
                .error(function (err) {
                    $scope.$emit('alert', {
                        kind: 'danger',
                        msg: err,
                        title: "Falha:"
                    });
                })
                .finally(function(){

                    $scope.processingSignInUp = false;

                });
                
            } else {
                
                $scope.processingSignInUp = false;
                
                $scope.$emit('alert', {
                      kind: 'danger',
                      msg: ['A senha e a confirmação da senha devem ser idênticas.'],
                      title: "Falha:"
                });
                
            }
            
        } else {
            
            $scope.processingSignInUp = false;
            
            $scope.$emit('alert', {
                  kind: 'danger',
                  msg: ['Preencha todos os campos para criar sua conta.'],
                  title: "Falha:"
            });
            
        }

    };
    
}]);

security.controller('MeCtrl', ['$scope', '$location', function($scope, $location) {
    
}]);