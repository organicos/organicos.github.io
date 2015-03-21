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
  'myApp.version',
  'myApp.contact',
  'ui.bootstrap'
]);


app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.otherwise({redirectTo: '/home'});

}]);

app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

app.controller('NavBarCtrl', function($scope) {
    
    $scope.isCollapsed = true;
});

app.controller('myAppCtrl', function($scope, $location, anchorSmoothScroll, myConfig) {

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