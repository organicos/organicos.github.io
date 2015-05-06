'use strict';

var newsletters = angular.module('myApp.newsletters', ['ngRoute']);

newsletters.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/newsletters', {
        templateUrl: '/partials/newsletters/newsletters.html',
        controller: 'AdminNewslettersCtrl'
    })
    .when('/newsletter/:id', {
        templateUrl: '/partials/newsletters/newsletter.html',
        controller: 'AdminNewsletterCtrl'
    })
    .when('/newsletter', {
        templateUrl: '/partials/newsletters/newsletter.html',
        controller: 'AdminNewsletterCtrl'
    });
}]);

newsletters.controller('AdminNewslettersCtrl', ['$scope','$http', 'myConfig', function($scope, $http, myConfig) {

    $scope.newsletters = [];
    $scope.newsletterFormModalObject = {};
    
    $http.get(myConfig.apiUrl+'/newsletters').then(function(res) {
    
        $scope.newsletters = res.data;
        
    }, function(err) {
    
        console.error('ERR', err);
    
    });

}]);

newsletters.controller('AdminNewsletterCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', function($scope, $http, $filter, $routeParams, myConfig) {

    $scope.newsletter = {
        title: ""
        , top: ""
        , bottom: ""
        , sections: []
    };
    
    $scope.addNewSection = function(){
        
        var newSection = {
            title: ""
            , top: ""
            , bottom: ""
            , products: []
            , articles: []
        }
        
        $scope.newsletter.sections.push(newSection);
        
        
    }
    
    if($routeParams.id){

        $http.get(myConfig.apiUrl+'/newsletter/'+$routeParams.id)
        .success(function(res) {
        
            $scope.newsletters = res;
            
        }).error(function(err) {
        
            console.error('ERR', err);
        
        });
        
    }

}]);