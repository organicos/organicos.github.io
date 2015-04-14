'use strict';

var home = angular.module('myApp.home', ['ngRoute']);

home.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: '/partials/home/home.html',
    controller: 'HomeCtrl'
  });
}]);

home.controller('HomeCtrl', ['$scope', '$http', 'myConfig', '$location', 'anchorSmoothScroll', function($scope, $http, myConfig, $location, anchorSmoothScroll) {
  
  $scope.highlightProducts = [];
  
  $http.get(myConfig.apiUrl+'/products/?highlight=true')
  .success(function(res) {

    $scope.highlightProducts = res;
    
    if($location.hash()){
      
      setTimeout(function(){

        anchorSmoothScroll.scrollTo($location.hash(), -63);
      
      }, 1000);
      
    }
    
  }).error(function(err) {
  
      $scope.$emit('alert', {
          kind: 'danger',
          msg: err,
          title: "Não foi possível acessar os dados do artigo. Verifique o motivo abaixo:"
      });

  });

}]);