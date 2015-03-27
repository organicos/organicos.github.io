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
  'myApp.home',
  'myApp.fair',
  'myApp.security',
  'myApp.version',
  'myApp.payments',
  'myApp.contact',
  'myApp.auth',
  'myApp.config'
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

app.controller('myAppCtrl' , ['$scope', '$location', 'anchorSmoothScroll', '$localStorage' , function($scope, $location, anchorSmoothScroll, $localStorage) {
    
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

    $scope.$storage = $localStorage.$default({
        user: {}
    });

    $scope.$back = function() {
        
        window.history.back();

    };
  
    $scope.alerts = [];

    $scope.addAlert = function(alertObj) {
        $scope.alerts.push(alertObj);
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
}]);

app.controller('NavBarCtrl', function($scope) {
    
    $scope.isCollapsed = true;
});

/**
 * Two-way data binding for contenteditable elements with ng-model.
 * @example
 *   <p contenteditable="true" ng-model="text"></p>
 */
 
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

