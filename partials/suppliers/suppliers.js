'use strict';

var suppliers = angular.module('myApp.suppliers', ['ngRoute']);

suppliers.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/suppliers', {
        templateUrl: '/partials/suppliers/suppliers.html',
        controller: 'AdminSuppliersCtrl'
    })
    .when('/supplier/:id', {
        templateUrl: '/partials/suppliers/supplier.html',
        controller: 'AdminSupplierCtrl'
    })
    .when('/supplier', {
        templateUrl: '/partials/suppliers/supplier.html',
        controller: 'AdminSupplierCtrl'
    });
}]);

suppliers.controller('AdminSuppliersCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', 'confirmModalService', function($scope, $http, $filter, $routeParams, myConfig, confirmModalService) {

    $scope.suppliers = [];
    $scope.supplierFormModalObject = {};
    
    $http.get(myConfig.apiUrl+'/suppliers').then(function(res) {
    
        $scope.suppliers = res.data;
        
    }, function(err) {
    
        console.error('ERR', err);
    
    });

    $scope.dropSupplier = function(supplier) {
    
        var modalOptions = {
            closeButtonText: 'Cancelar',
            actionButtonText: 'Excluir fornecedor',
            actionButtonKind: 'btn-danger',
            headerText: 'Excluir o fornecedor ' + supplier.name + "?",
            bodyText: 'Deseja realmente excluir o fornecedor ' + supplier.name + "?"
        };
        
        confirmModalService.showModal({}, modalOptions)
        .then(function (result) {
        
            if(result){
            
                $http.delete(myConfig.apiUrl + '/suppliers/' + supplier._id)
                .success(function(res) {
                
                    var productIndex = $scope.suppliers.indexOf(supplier);
                    
                    $scope.suppliers.splice(productIndex, 1);
                
                })
                .error(function (resp) {
                
                    var error_list = [];
                    
                    angular.forEach(resp.errors, function(error, path) {
                        this.push(error.message);
                    }, error_list);
                    
                    $scope.$emit('alert', {
                        kind: 'danger',
                        msg: error_list,
                        title: "Não foi possível remover a fornecedor. Verifique o motivo abaixo:"
                    });
                
                });
            
            }
        
        });
    
    };
    
}]);

suppliers.controller('AdminSupplierCtrl', ['$scope','$http', '$routeParams', 'myConfig', '$location', function($scope, $http, $routeParams, myConfig, $location) {
  
    $scope.supplier = {};
    $scope.suppliersQuery = "";
    $scope.processingSupplierUpdate = false;
    
    if($routeParams.id){
    
        $http.get(myConfig.apiUrl+'/supplier/'+$routeParams.id)
        .success(function(res) {
        
            $scope.supplier = res;
        
        }).error(function(err) {
        
            console.error('ERR', err);
        
        });
        
    }
    
    $scope.supplierFormSubmit = function () {
    
        $scope.processingSupplierUpdate = true;
        
        if($scope.supplier._id){
          
            $scope.supplierPut($scope.product);
          
        } else {
        
            $scope.supplierPost($scope.product); 
        
        }
    
    }
  
    $scope.supplierPost = function() {
    
        $http.post(myConfig.apiUrl + '/supplier', $scope.supplier)
        .success(function(resp) {
          
            $location.path("/supplier/" + resp._id);
            
        })
        .error(function (resp) {
          
            var error_list = [];
            
            angular.forEach(resp.errors, function(error, path) {
                this.push(error.message);
            }, error_list);
            
            $scope.$emit('alert', {
                kind: 'danger',
                msg: error_list,
                title: "Não foi possível inserir a supplierm. Verifique o motivo abaixo:"
            });
        
        })
        .finally(function () {
            $scope.processingSupplierUpdate = false;
        });
    
    };
  
    $scope.supplierPut = function(){

        $http.put(myConfig.apiUrl+'/supplier/'+$scope.supplier._id, $scope.supplier)
        .success(function(res) {
            
        
            $scope.$storage.supplier = res;
    
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

            $scope.processingSupplierUpdate = false;

        });
        
    }


  
}]);