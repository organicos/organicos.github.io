'use strict'; //avoid bad practice as global var declaration

var $scope, $location;

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'ngStorage',
  'ngAnimate',
  'angular.filter',
  'satellizer',
  'ngSanitize',
  'ngFileUpload',
  'myApp.home',
  'myApp.fair',
  'myApp.tickets',
  'myApp.security',
  'myApp.contact',
  'myApp.admin',
  'myApp.users',
  'myApp.order',
  'myApp.products',
  'myApp.config',
  'myApp.certification',
  'myApp.susteinable',
  '720kb.socialshare',
  'myApp.about',
  'myApp.addresses',
  'myApp.groups',
  'myApp.articles',
  'myApp.suppliers',
  'myApp.blog',
  'myApp.newsletters',
  'myApp.categories',
  'myApp.shipping',
  'myApp.custom-filters',
  'chart.js'
]);

app.config(['$routeProvider', '$httpProvider', '$authProvider', '$locationProvider', function($routeProvider, $httpProvider, $authProvider, $locationProvider) {

    // define default route
    $routeProvider.otherwise({redirectTo: '/'});

    // Append the Authenticated hash to the header
    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
        
        return {
            'request': function (config) {
                
                config.headers = config.headers || {};
                if ($localStorage.user && $localStorage.user.token) {
                  config.headers.Authorization = 'Organic ' + $localStorage.user.token;
                }
                return config;
            },
            'responseError': function(response) {
                var login_path = '/entrar'+$location.path();
                
                if(response.status === 401 || response.status === 403) {
                  $location.path(login_path);
                }
                return $q.reject(response);
            }
        };
    }]);
    
    // add cross-domain to the header
    $httpProvider.defaults.useXDomain = true;

    // remove some http header to use CORS
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
    
    $locationProvider.html5Mode(true).hashPrefix('!');
        
}]);

app.controller('myAppCtrl' , ['$scope', '$location', '$localStorage', 'basketService', 'HtmlMetaTagService', '$http', 'myConfig' , function($scope, $location, $localStorage, basketService, HtmlMetaTagService, $http, myConfig) {
    
    // Basket 
    $scope.openBasket = basketService.showModal;
    $scope.addToBasket = basketService.addToBasket;
    $scope.dropFromBasket = basketService.dropFromBasket;
    $scope.getBasketProductsAmount = basketService.productsAmount;

    $scope.$storage = $localStorage.$default({
        user: {kind: ''},
    });
    $scope.followingShippingDate = '';
    $scope.alerts = [];
    $scope.signupToNewsletter = {mail: ""};
    
    $scope.$watch(function() { return $location.path(); }, function(newValue, oldValue){
        
        var privateRoutes = [
            '/eu'
            , '/revisar-ordem'
            , '/administracao'
            , '/usuarios'
            , '/produtos'
            , '/pedidos'
            , '/pedido'
            , '/meus/pedidos'
            , '/meu/pedido'
            , '/artigos'
            , '/categories'
            , '/suppliers'
            , '/images'
        ];

        if(privateRoutes.indexOf(newValue) > -1){

            if ($scope.$storage.user.token){
                
                $scope.ping(function (err, res) {

                    if(err) { // is not logged anymore. invalid token
                    
                        $location.path('/entrar'+newValue);
                        
                    }

                });
                
            } else {
                
                $location.path('/entrar'+newValue);
                    
            } 
        
        }
 
    });
    
    $http.get(myConfig.apiUrl + '/shipping/following')
    .success(function(res) {
      
      $scope.followingShippingDate = res;
      
    })
    .error(function(err) {
    
        console.error('ERR', err);
    
    });
    
    $scope.ensureUser = function() {
        $scope.$storage.user = $scope.$storage.user ? $scope.$storage.user : {kind: ''};
    }();
    
    $scope.ping = function(callback) {
        callback();
    }

    $scope.$back = function() {
        
        window.history.back();

    };
  
    $scope.addAlert = function(alertObj) {
        
        $scope.alerts.unshift(alertObj);
        
        if(alertObj.duration == undefined || alertObj.duration > 0){

            setTimeout(function(){
                
                $scope.$apply(function(){
                    var index = $scope.alerts.indexOf(alertObj);
                    $scope.alerts.splice(index, 1);            
                });
                
            },
            alertObj.duration || 5000)
        }
        

    };
    
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);    
    }
        
    $scope.$on('alert', function(event, alertObj) {
        $scope.addAlert(alertObj);
    });
    
    $scope.signupToNewsletter = function(){
        
        var email = $scope.signupToNewsletter.mail;
        
        if(email.length == 0) {
            
            $scope.addAlert({
                kind: 'danger',
                title: 'Ocorreu um problema ao assinar nossa newsletter. Veja abaixo o motivo:',
                msg: ['Favor informar o um e-mail válido na assinatura da newsletter.']
            });
            
        } else {
            
            $http.post(myConfig.apiUrl + '/newsletter/signup', {email: email})
            .success(function(res) {
              
                $scope.addAlert({
                    kind: 'success',
                    title: 'Assinatura feita com sucesso.',
                    msg: ['A partir de agora, você receberá nossa lista semanal de preços e promoções.']
                });
                
                $scope.signupToNewsletter.mail = "";
              
            })
            .error(function(err) {
            
                angular.forEach(err.errors, function(error, path) {
                    this.push(error.message);
                }, error_list);
                
                $scope.addAlert({
                    kind: 'danger',
                    title: 'Ocorreu um problema ao assinar nossa newsletter. Veja abaixo o motivo:',
                    msg: error_list
                });
            
            });
            
        }
        
    }
    
}]);