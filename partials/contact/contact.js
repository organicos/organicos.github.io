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
	var VitrineCtrl = this;
	ContactCtrl.contacts = [];
    // http://104.154.82.56/api/products - URL do recurso
    $http.get('https://fodev-api-vinagreti.c9.io/api/tickets').then(function(resp) {
      ContactCtrl.contacts = resp.data;
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });
    $scope.submit = function(contactForm) {
        console.log($scope);
        if (contactForm.phone.$viewValue && contactForm.email.$viewValue && contactForm.name.$viewValue && contactForm.msg.$viewValue) {
            $http.post('https://fodev-api-vinagreti.c9.io/api/tickets',{
                text: contactForm.phone.$viewValue
                , email: contactForm.email.$viewValue
                , name: contactForm.name.$viewValue
                , msg: contactForm.msg.$viewValue
            })
            .success(function(data, status, headers, config){
                console.log(data, status, headers, config);
                alert('enviado');
            })
            .error(function(data, status, headers, config){
                alert('erro ao enviar');
            });
        } else {
            alert('Por favor, preencha ao menos o seu e-mail e sua mesagem.');
        }
        return false; 
    };
}]);