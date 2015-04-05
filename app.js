'use strict'; //avoid bad practice as global var declaration

var $scope, $location;

// configurations
var config = angular.module('myApp.config', [])
.constant('myConfig', {
  'apiUrl': '//fodev-api-vinagreti-1.c9.io/v1',
});

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
  'myApp.security',
  'myApp.version',
  'myApp.payments',
  'myApp.contact',
  'myApp.auth',
  'myApp.admin',
  'myApp.users',
  'myApp.order',
  'myApp.products',
  'myApp.config',
  'myApp.articles',
  'myApp.blog'
]);

app.config(['$routeProvider', '$httpProvider', '$authProvider', function($routeProvider, $httpProvider, $authProvider) {

    // define the google api token
    $authProvider.google({
      clientId: '741540784926-5973e11m7n43r2hd1333e72nrv1mvjma.apps.googleusercontent.com'
    });

    // define default route
    $routeProvider.otherwise({redirectTo: '/home'});
    
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
              if(response.status === 401 || response.status === 403) {
                  $location.path('/signin');
              }
              return $q.reject(response);
          }
      };
    }]);

    // add cross-domain to the header
    $httpProvider.defaults.useXDomain = true;

    // remove some http header to use CORS
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
        
}]);

app.controller('myAppCtrl' , ['$scope', '$location', 'anchorSmoothScroll', '$localStorage', 'basketModalService' , function($scope, $location, anchorSmoothScroll, $localStorage, basketModalService) {
    
    $scope.$storage = $localStorage.$default({
        user: {kind: ''},
        basket: {total: 0,name: '',products: []}
    });
    
    $scope.ensureUser = function() {
        $scope.$storage.user = $scope.$storage.user ? $scope.$storage.user : {kind: ''};
    }();
    
    $scope.ensureBasket = function() {
        
    	if(!$scope.$storage.basket){
    	 
    	    $scope.$storage.basket = {total: 0,name: '',products: []};
    	 
    	} else {
        	if(!$scope.$storage.basket.products) $scope.$storage.basket.products = {};
        	if(!$scope.$storage.basket.total) $scope.$storage.basket.total = 0;
        	if(!$scope.$storage.basket.name) $scope.$storage.basket.name = '';
    	}
        
    }();

    $scope.ping = function(callback) {
        
        callback();
        
    }

    $scope.$watch(function() { return $location.path(); }, function(newValue, oldValue){
        
        var privateRoutes = [
            '/me'
            , '/order_review'
        ];

        if(privateRoutes.indexOf(newValue) > -1){

            if ($scope.$storage.user.token){
                
                $scope.ping(function (err, res) {

                    if(err) { // is not logged anymore. invalid token
                    
                        $location.path('/signin'+newValue);
                        
                    }

                });
                
            } else {
                
                $location.path('/signin'+newValue);
                    
            } 
        
        }
 
    });

    $scope.$back = function() {
        
        window.history.back();

    };
  
    $scope.alerts = [];

    $scope.addAlert = function(alertObj) {
        
        $scope.alerts.unshift(alertObj);
        
        setTimeout(function(){
            
            $scope.$apply(function(){
                var index = $scope.alerts.indexOf(alertObj);
                $scope.alerts.splice(index, 1);            
            });
            
        },
        5000)
    };
    
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);    
    }
        
    $scope.$on('alert', function(event, alertObj) {
        $scope.addAlert(alertObj);
    });
    
    $scope.gotoElement = function (eID, offset){
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash(eID);
 
      // call $anchorScroll()
      anchorSmoothScroll.scrollTo(eID, offset);
      
    };
    
    $scope.appAlert = function(msg, duration) {

        alert(msg.join('<br>'));
        
    };

    $scope.openBasket = function () {

        var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Fechar meu pedido',
            headerText: 'Minha cesta orgânica',
            bodyText: 'Are you sure you want to delete this customer?'
        };

        basketModalService.showModal();
    }
    
}]);

app.controller('NavBarCtrl', function($scope) {
    
    $scope.isCollapsed = true;
    
    $scope.totalBasketItens = function(){
        var total = 0;
        for(count=0;count<$scope.items.length;count++){
            total += $scope.items[count].Price + $scope.items[count].Price;
        }
        return total;
    };

});

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
                    $modalInstance.close(result);
                };
                $scope.modalOptions.close = function (result) {
                    $modalInstance.dismiss('cancel');
                };
            }
        }

        return $modal.open(tempModalDefaults).result;
    };

}]);

app.service('basketModalService', ['$modal', function ($modal) {

    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: '/partials/basket/basket_modal.html'
    };

    var modalOptions = {
        closeButtonText: 'Close',
        actionButtonText: 'OK',
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
                    $modalInstance.close(result);
                };
                $scope.modalOptions.close = function (result) {
                    $modalInstance.dismiss('cancel');
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

