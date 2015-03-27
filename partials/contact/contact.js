'use strict';

var contact = angular.module('myApp.contact', ['ngRoute']);

contact.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contact', {
    templateUrl: 'partials/contact/contact.html',
    controller: 'ContactCtrl'
  });
}]);

contact.controller('ContactCtrl', ['$scope','$http', 'myConfig', function($scope, $http, myConfig) {

	var ContactCtrl = this;

    $scope.submit = function(contactForm) {
        if (contactForm.email.$viewValue && contactForm.msg.$viewValue) {
            $http.post(myConfig.apiUrl+'/tickets',{
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
                $scope.$emit('alert', {
                    kind: 'danger',
                    msg: data.errors
                });
            });
        } else {
            alert('Por favor, preencha ao menos o seu e-mail e sua mesagem.');
        }
        return false; 
    };

}]);