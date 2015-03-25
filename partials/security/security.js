'use strict';

var security = angular.module('myApp.security', ['ngRoute']);

security.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
 
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
            templateUrl: 'partials/security/signup.html',
            controller: 'SecurityCtrl'
        });
        
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

security.controller('SecurityCtrl', ['$rootScope', '$scope', 'Main', '$localStorage', '$location', '$routeParams', function($rootScope, $scope, Main, $localStorage, $location, $routeParams) {
    
    var locationPath = $location.path();
    
    $scope.me = function() {
        Main.me(function(res) {
            $scope.$storage.user = res.data;
        }, function() {
            $rootScope.error = 'Falha ao buscar os dados';
        });
    };

    $scope.logout = function() {
        Main.logout(function() {
            $scope.$storage.user = {};
            $location.path("#/signin");
        }, function() {
            $scope.$emit('alert', {
                  kind: 'danger',
                  msg: 'Não foi possível encerrar a sessão.',
                  title: "Falha:"
            });
        });
    };

    switch(locationPath) {
        case "/me":
            $scope.me();
        break;
        case "/logout":
            $scope.logout();
        break;
        case '/signin':
            if ($scope.$storage.user.token) {
                $location.path("#/me");
            }
        break;
    }
}]);