'use strict';

var contact = angular.module('myApp.contact', ['ngRoute']);

contact.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contact', {
    templateUrl: 'partials/contact/contact.html',
    controller: 'VitrineCtrl'
  });
}]);

contact.controller('ContactCtrl', ['$scope','$http', function($scope, $http) {

	var ContactCtrl = this;

    $scope.submit = function(contactForm) {
        console.log($scope);
        if (contactForm.email.$viewValue && contactForm.msg.$viewValue) {
            $http.post('//fodev-api-vinagreti.c9.io/api/tickets',{
                email: contactForm.email.$viewValue
                , name: contactForm.name.$viewValue
                , phone: contactForm.phone.$viewValue
                , msg: contactForm.msg.$viewValue
                , kind: 'contact'
            })
            .success(function(data, status, headers, config){
                alert('enviado - apagar formulario');
            })
            .error(function(data, status, headers, config){
                
                var log = [];
                angular.forEach(data.errors, function(error, error_key) {
                  this.push(error_key + ': ' + error.message);
                }, log);
                
                $scope.appAlert(log);
            });
        } else {
            alert('Por favor, preencha ao menos o seu e-mail e sua mesagem.');
        }
        return false; 
    };

}]);