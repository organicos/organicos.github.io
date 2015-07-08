'use strict';

var shipping = angular.module('myApp.shipping', ['ngRoute']);

shipping.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/shipping/options', {
        templateUrl: '/partials/shipping/options.html',
        controller: 'AdminShippingOptionsCtrl'
    });
}]);

shipping.controller('AdminShippingOptionsCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', 'confirmModalService', 'HtmlMetaTagService', function($scope, $http, $filter, $routeParams, myConfig, confirmModalService, HtmlMetaTagService) {
    
    HtmlMetaTagService.tag('title', 'Configurações de frete');

    $scope.shipping = {
        cities: []
    };
    $scope.city = {
        name: ""
        , price: ""
    };

    $scope.addShippingCity = function(city){
        $scope.shipping.cities.push(city);
    }

}]);