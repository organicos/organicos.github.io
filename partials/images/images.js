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
    })
    .when('/image', {
        templateUrl: '/partials/images/image.html',
        controller: 'AdminImageCtrl'
    });
}]);

images.controller('AdminImagesCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', 'HtmlMetaTagService', function($scope, $http, $filter, $routeParams, myConfig, HtmlMetaTagService) {
    
    HtmlMetaTagService.tag('title', 'Imagens');

    $scope.images = [];
    $scope.imageFormModalObject = {};
    
    $http.get(myConfig.apiUrl+'/images').then(function(res) {
    
        $scope.images = res.data;
        
    }, function(err) {
    
        console.error('ERR', err);
    
    });

}]);

images.controller('AdminImageCtrl', ['$scope','$http', '$routeParams', 'myConfig', '$location', 'HtmlMetaTagService', function($scope, $http, $routeParams, myConfig, $location, HtmlMetaTagService) {
  
    $scope.image = {};
    $scope.imagesQuery = "";
    $scope.processingImageUpdate = false;
    
    if($routeParams.id){
    
        $http.get(myConfig.apiUrl+'/image/'+$routeParams.id)
        .success(function(res) {
            
            HtmlMetaTagService.tag('title', res.title);
        
            $scope.image = res;
        
        }).error(function(err) {
        
            console.error('ERR', err);
        
        });
        
    }
    
    $scope.imageFormSubmit = function () {
    
        $scope.processingImageUpdate = true;
        
        if($scope.image._id){
          
            $scope.imagePut($scope.product);
          
        } else {
        
            $scope.imagePost($scope.product); 
        
        }
    
    }
  
    $scope.imagePost = function() {
    
        $http.post(myConfig.apiUrl + '/image', $scope.image)
        .success(function(resp) {
          
            $location.path("/image/" + resp._id);
            
        })
        .error(function (resp) {
          
            var error_list = [];
            
            angular.forEach(resp.errors, function(error, path) {
                this.push(error.message);
            }, error_list);
            
            $scope.$emit('alert', {
                kind: 'danger',
                msg: error_list,
                title: "Não foi possível inserir a imagem. Verifique o motivo abaixo:"
            });
        
        })
        .finally(function () {
            $scope.processingImageUpdate = false;
        });
    
    };
  
    $scope.imagePut = function(){

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