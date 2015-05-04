'use strict';

var images = angular.module('myApp.images', ['ngRoute']);

images.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/images', {
        templateUrl: '/partials/images/images.html',
        controller: 'AdminImagesCtrl'
    })
    .when('/image/:id', {
        templateUrl: '/partials/images/image.html',
        controller: 'AdminImageCtrl'
    });
}]);

images.controller('AdminImagesCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', function($scope, $http, $filter, $routeParams, myConfig) {

    $scope.images = [];
    $scope.imageFormModalObject = {};
    
    $http.get(myConfig.apiUrl+'/images').then(function(res) {
    
        $scope.images = res.data;
        
    }, function(err) {
    
        console.error('ERR', err);
    
    });

}]);

images.controller('AdminImageCtrl', ['$scope','$http', '$routeParams', 'myConfig', function($scope, $http, $routeParams, myConfig) {
  
    $scope.image = {};
    $scope.processingImageUpdate = false;
    
    $http.get(myConfig.apiUrl+'/image/'+$routeParams.id)
    .success(function(res) {
    
        $scope.image = res;
    
    }).error(function(err) {
    
        console.error('ERR', err);
    
    });
    
    $scope.updateImage = function(){
        
        $scope.processingImageUpdate = true;
        
        $http.put(myConfig.apiUrl+'/image/'+$scope.image._id, $scope.image)
        .success(function(res) {
            
        
            $scope.$storage.image = res;
    
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

            $scope.processingImageUpdate = false;

        });
        
    }


  
}]);