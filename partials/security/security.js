'use strict';

var security = angular.module('myApp.security', ['ngRoute']);

security.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
 
    $routeProvider.
        when('/signin', {
            templateUrl: 'partials/security/signin.html',
            controller: 'SecurityCtrl'
        }).
        when('/signup', {
            templateUrl: 'partials/security/signup.html',
            controller: 'SecurityCtrl'
        }).
        when('/me', {
            templateUrl: 'partials/security/me.html',
            controller: 'SecurityCtrl'
        }).
        when('/logout', {
            templateUrl: 'partials/security/me.html',
            controller: 'SecurityCtrl'
        });
        
}]);

security.controller('SecurityCtrl', ['$rootScope', '$scope', 'Main', '$localStorage', '$location', function($rootScope, $scope, Main, $localStorage, $location) {
    
    var locationPath = $location.path();
    
    $scope.signin = function() {
        var formData = {
            email: $scope.email,
            password: $scope.password
        };

        Main.signin(formData, function(res) {
            if (res.type == false) {
                alert(res.data);
            } else {
                $scope.$storage.user = res.data;
                window.location = "#/me";
            }
        }, function() {
            $rootScope.error = 'Falha ao tentar acessar';
        })
    };

    $scope.signup = function() {
        var formData = {
            email: $scope.email,
            password: $scope.password
        };

        Main.signup(formData, function(res) {
            if (res.type == false) {
                alert(res.data);
            } else {
                $scope.$storage.user = res.data;
                window.location = "/";
            }
        }, function() {
            $rootScope.error = 'Falha ao registrar-se';
        });

    };

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
            window.location = "#/signin"
        }, function() {
            alert("Falha ao sair!");
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
                window.location = "#/me";
            }
        break;
    }
}]);