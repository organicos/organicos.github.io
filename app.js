'use strict'; //avoid bad practice as global var declaration

var $scope, $location;

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'ngStorage',
  'angular.filter',
  'satellizer',
  'ngSanitize',
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
  'myApp.about',
  'myApp.images',
  'myApp.articles',
  'myApp.suppliers',
  'myApp.blog',
  'myApp.newsletters',
  'myApp.categories',
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
                
                console.log('app:::::  ' + login_path);
                
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

app.service('HtmlMetaTagService', ['$location', function($location) {
    
    var HtmlMetaTagService = this;
    var metaData = {
        title: 'Feira Orgânica Delivery - Produtos organicos entregues em sua porta.'
    };

    return {
        resetData: function() {
            metaData = {
                title: 'Feira orgânica Delivery - Produtos orgânicos entregues em sua porta.'
            };
            return HtmlMetaTagService;
        },
        tag: function (tag, value) {
            if (!tag && !value) {
                return metaData;
            } else if (!value) {
                return metaData[tag];
            } else {
                metaData[tag] = value;
                return HtmlMetaTagService;
            }
        }
   }
  
}]);

app.controller('headCtrl' , ['$scope', 'HtmlMetaTagService' , function($scope, HtmlMetaTagService) {

    // Reset HTML Meta Tags
    HtmlMetaTagService.resetData();
    $scope.HtmlMetaTagService = HtmlMetaTagService;
    
}]);

app.controller('myAppCtrl' , ['$scope', '$location', 'anchorSmoothScroll', '$localStorage', 'basketService', 'HtmlMetaTagService', '$http', 'myConfig' , function($scope, $location, anchorSmoothScroll, $localStorage, basketService, HtmlMetaTagService, $http, myConfig) {
    
    // Basket 
    $scope.openBasket = basketService.showModal;
    $scope.addToBasket = basketService.addToBasket;
    $scope.dropFromBasket = basketService.dropFromBasket;
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

app.controller('NavBarCtrl', function($scope, $localStorage) {
    
    $scope.isCollapsed = true;
    
    $scope.user = $localStorage.user;
    
    $scope.$on('$routeChangeSuccess', function(){
        $scope.isCollapsed = true;
    });
    
    $scope.totalBasketItens = function(){
        var total = 0;
        for(count=0;count<$scope.items.length;count++){
            total += $scope.items[count].Price + $scope.items[count].Price;
        }
        return total;
    };

});

app.service('basketService', ['$modal', '$localStorage', '$filter', function ($modal, $localStorage, $filter) {
    
    var self = this;
    var basket = $localStorage.basket;

    (this.ensureBasket = function() {
    	if(!basket){
    	    basket = {total: 0,name: '',products: [], shipping: {price: 6, country: 'Brasil'}};
    	} else {
        	if(!basket.products) basket.products = {};
        	if(!basket.total || basket.total < 0) basket.total = 0;
        	if(!basket.name) basket.name = '';
        	if(!basket.shipping) basket.shipping = {price: 6, country: 'Brasil'};
    	}
    	
    	$localStorage.basket = basket;
    })();

    (this.refreshTotal = function () {
        
        basket.total = 0;
        
        angular.forEach(basket.products, function(product, key) {
            basket.total += product.prices ? product.prices[0].price * product.quantity : 1;
        });
        
    })();
    
    this.addToBasket = function (product) {
        var basketProduct = ($filter('filter')(basket.products, {_id: product._id}, false))[0];
        if(basketProduct){
            basketProduct.quantity = basketProduct.quantity >= 0 ? basketProduct.quantity : 1;
            basketProduct.quantity ++;
        }  else {
            product.quantity = 1;
            basket.products.push(product);
        }
        self.refreshTotal();
    };
    
    this.dropFromBasket = function (product, decreasingAmount) {
        var productIndex = basket.products.indexOf(product);
        var product = basket.products[productIndex];
        if (productIndex >= 0) {
            if (decreasingAmount > 0 & product.quantity > decreasingAmount) {
                product.quantity -= decreasingAmount;
            } else {
                basket.products.splice(productIndex, 1);   
            }
        }
        self.refreshTotal();
    };
    
    this.showModal = function(){
        return $modal.open({
            backdrop: true,
            keyboard: true,
            modalFade: true,
            size: 'lg',
            templateUrl: '/partials/basket/basket_modal.html',
            controller: function ($scope, $location, $modalInstance) {
                $scope.basket = basket;
                $scope.addToBasket = self.addToBasket;
                $scope.dropFromBasket = self.dropFromBasket;
                $scope.modalOptions = {
                    ok: function (result) {
                        $location.path('/revisar-pedido');
                        $modalInstance.dismiss('order_review');
                    },
                    close: function (result) {
                        $modalInstance.dismiss('cancel');
                    },
                    goToFair: function(){
                        $location.path('/feira');
                        $modalInstance.dismiss('fair');
                    }
                };
            }
        }).result;
    };
    
}]);

app.service('confirmModalService', ['$modal', function ($modal) {

    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: '/partials/modals/confirm.html'
    };

    var modalOptions = {
        closeButtonText: 'Close',
        actionButtonText: 'OK',
        actionButtonKind: 'btn-primary',
        headerText: 'Continuar?',
        bodyText: 'Realizar esta ação?'
    };

    this.showModal = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) customModalDefaults = {};
        customModalDefaults.backdrop = 'static';
        return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function (customModalDefaults, customModalOptions) {
        //Create temp objects to work with since we're in a singleton service
        var tempModalDefaults = {};
        var tempModalOptions = {};

        //Map angular-ui modal custom defaults to modal defaults defined in service
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

        //Map modal.html $scope custom properties to defaults defined in service
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = function ($scope, $modalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.modalOptions.ok = function (result) {
                    $modalInstance.close(true);
                };
                $scope.modalOptions.close = function (result) {
                    $modalInstance.close(false);
                };
            }
        }

        return $modal.open(tempModalDefaults).result;
    };

}]);

app.directive('contenteditable', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            // view -> model
            elm.bind('blur', function() {~
              console.log(scope);
                scope.$apply(function() {
                    ctrl.$setViewValue(elm.html());
                });
            });

            // model -> view
            ctrl.$render = function() {
                elm.html(ctrl.$viewValue);
            };

            // load init value from DOM
            ctrl.$setViewValue(elm.html());
        }
    };
});

app.service('anchorSmoothScroll', function(){
    
    this.scrollTo = function(eID, offset) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        
        var startY = currentYPosition();
        var stopY = elmYPosition(eID) + offset;
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        speed = 30;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY;
                timer++;
            }
            return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step;
            if (leapY < stopY) leapY = stopY;
            timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };
    
});