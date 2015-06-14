'use strict';

var files = angular.module('myApp.files', ['ngRoute']);

files.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/arquivos', {
        templateUrl: '/partials/files/files.html',
        controller: 'AdminFilesCtrl'
    })
    .when('/arquivo/:id', {
        templateUrl: '/partials/files/file.html',
        controller: 'AdminFileCtrl'
    })
    .when('/arquivo', {
        templateUrl: '/partials/files/file.html',
        controller: 'AdminFileCtrl'
    });
}]);

files.controller('AdminFilesCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', 'HtmlMetaTagService', function($scope, $http, $filter, $routeParams, myConfig, HtmlMetaTagService) {
    
    HtmlMetaTagService.tag('title', 'Filens');

    $scope.files = [];
    $scope.fileFormModalObject = {};
    
    $http.get(myConfig.apiUrl+'/files').then(function(res) {
    
        $scope.files = res.data;
        
    }, function(err) {
    
        console.error('ERR', err);
    
    });

}]);

files.controller('AdminFileCtrl', ['$scope','$http', '$routeParams', 'myConfig', '$location', 'HtmlMetaTagService', 'filesService', function($scope, $http, $routeParams, myConfig, $location, HtmlMetaTagService, filesService) {
  
    $scope.file = {};
    $scope.filesQuery = "";
    $scope.processingFileUpdate = false;
    $scope.filesService = filesService;
    
    if($routeParams.id){
    
        $http.get(myConfig.apiUrl+'/file/'+$routeParams.id)
        .success(function(res) {
            
            HtmlMetaTagService.tag('title', res.title);
        
            $scope.file = res;
        
        }).error(function(err) {
        
            console.error('ERR', err);
        
        });
        
    }
    
    $scope.fileFormSubmit = function () {
    
        $scope.processingFileUpdate = true;
        
        if($scope.file._id){
          
            $scope.filePut($scope.product);
          
        } else {
        
            $scope.filePost($scope.product); 
        
        }
    
    }
  
    $scope.filePost = function() {
    
        $http.post(myConfig.apiUrl + '/file', $scope.file)
        .success(function(resp) {
          
            $location.path("/file/" + resp._id);
            
        })
        .error(function (resp) {
          
            var error_list = [];
            
            angular.forEach(resp.errors, function(error, path) {
                this.push(error.message);
            }, error_list);
            
            $scope.$emit('alert', {
                kind: 'danger',
                msg: error_list,
                title: "Não foi possível inserir a filem. Verifique o motivo abaixo:"
            });
        
        })
        .finally(function () {
            $scope.processingFileUpdate = false;
        });
    
    };
  
    $scope.filePut = function(){

        $http.put(myConfig.apiUrl+'/file/'+$scope.file._id, $scope.file)
        .success(function(res) {
            
        
            $scope.$storage.file = res;
    
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

            $scope.processingFileUpdate = false;

        });
        
    }


  
}]);