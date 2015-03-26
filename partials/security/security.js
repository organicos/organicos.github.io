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

security.controller('SigninCtrl', ['$scope', '$location', '$routeParams','$http', function ($scope, $location, $routeParams, $http) {
    
    $scope.signin = function() {
        var formData = {
            email: $scope.email,
            password: $scope.password
        };

        $http.post('//fodev-api-vinagreti.c9.io/v1/signin', formData)
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
        });
    };
    
}]);

security.controller('SignupCtrl', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {

    $scope.signup = function() {
        var formData = {
            name: $scope.name,
            email: $scope.email,
            password: $scope.password,
            password_hint: $scope.password_hint
        };
        
        if($scope.name && $scope.email && $scope.password && $scope.password_hint){
            
            if($scope.password == $scope.password_hint){

                $http.post('//fodev-api-vinagreti.c9.io/v1/signup', formData)
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
                });
                
            } else {
                
                $scope.$emit('alert', {
                      kind: 'danger',
                      msg: ['A senha e a confirmação da senha devem ser idênticas.'],
                      title: "Falha:"
                });
                
            }
            
        } else {
            
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