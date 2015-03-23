'use strict'; //avoid bad practice as global var declaration

var $scope, $location;

// Declare app level module which depends on views, and components
angular.module('myApp.myConfig', []).constant('myConfig', {
  'api': 'https://104.154.82.56/api/',
  'assetsUrl': 'https://s3-sa-east-1.amazonaws.com/fodev/',
  'imageResizeServiceUrl': 'https://images.elasticbeanstalk.com/',
  'version': 0.2
});

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'myApp.myConfig',
  'ngRoute',
  'myApp.home',
  'myApp.fair',
  'myApp.security',
  'myApp.version',
  'myApp.contact',
  'ui.bootstrap',
  'ngStorage'
]);

app.factory('Main', ['$http', '$localStorage', function($http, $localStorage){
        var baseUrl = "//fodev-api-vinagreti.c9.io/v1";
        function changeUser(user) {
            angular.extend(currentUser, user);
        }
 
        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Cadeia de caracteres base64url inválida!';
            }
            return window.atob(output);
        }
 
        function getUserFromToken() {
            var token = $localStorage.user.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }
 
        var currentUser = getUserFromToken();
 
        return {
            signup: function(data, success, error) {
                $http.post(baseUrl + '/signup', data).success(success).error(error)
            },
            signin: function(data, success, error) {
                $http.post(baseUrl + '/signin', data).success(success).error(error)
            },
            me: function(success, error) {
                $http.get(baseUrl + '/me').success(success).error(error)
            },
            logout: function(success) {
                changeUser({});
                success();
            }
        };
    }
]);

app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

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

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
        
}]);

app.controller('myAppCtrl'
    , ['$scope', '$location', 'anchorSmoothScroll', 'myConfig', '$localStorage'
    , function($scope, $location, anchorSmoothScroll, myConfig, $localStorage) {

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