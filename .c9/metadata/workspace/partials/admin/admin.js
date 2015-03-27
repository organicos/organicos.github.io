{"filter":false,"title":"admin.js","tooltip":"/partials/admin/admin.js","undoManager":{"mark":40,"position":40,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":84,"column":4},"action":"insert","lines":["'use strict';","","var payments = angular.module('myApp.payments', ['ngRoute']);","","payments.config(['$routeProvider', function($routeProvider) {","  $routeProvider.when('/payments', {","    templateUrl: 'partials/payments/payments.html',","    controller: 'PaymentsCtrl'","  });","  $routeProvider.when('/order_review', {","    templateUrl: 'partials/payments/order_review.html',","    controller: 'OrderReviewCtrl'","  });","  $routeProvider.when('/payments/:id', {","    templateUrl: 'partials/payments/payments.html',","    controller: 'PaymentsCtrl'","  });","}]);","","payments.controller('OrderReviewCtrl', ['$scope', function ($scope) {","","  $scope.DeliveryDayAndTimeOptions = [","    'Quinta-feira a tarde'","    , 'Quinta-feira a noite'","    , 'Sábado pela manhã'","    , 'Sábado a tarde'","  ];","","}]);","","payments.controller('OrderReviewCtrl', ['$scope','$http', '$filter', '$routeParams', function($scope, $http, $filter, $routeParams) {","  ","    $scope.country = 'Brasil';","    ","    function jsonp_callback(data){","      ","      console.log('jsonpcall');","      ","    }","","    $scope.$watch('cep', function(newValue, oldValue) {","      ","      var cep = newValue ? newValue.match(/\\d+/) : '';","","      if(cep.toString().length == 8){","        ","        $http.jsonp('//api.postmon.com.br/v1/cep/'+cep+'?callback=JSON_CALLBACK')","        .success(function(res) {","          ","          $scope.street = res.logradouro || '';","          $scope.district = res.bairro || '';","          $scope.city = res.cidade || '';","          $scope.state = res.estado || '';","        ","        })","        .error(function(err) {","        ","            console.error('ERR', err);","        ","        });","        ","      }","","    });","","}]);","","payments.controller('PaymentsCtrl', ['$scope','$http', '$filter', '$routeParams', 'myConfig', function($scope, $http, $filter, $routeParams, myConfig) {","","    $scope.payments = [];","    $scope.paymentFormModalObject = {};","    ","    $http.get(myConfig.apiUrl+'/payments').then(function(res) {","    ","        $scope.payments = res.data;","        ","        $scope.paymentFormModalObject = ($filter('filter')($scope.payments, {_id: $routeParams.id}, false))[0];","    ","    }, function(err) {","    ","        console.error('ERR', err);","    ","    });","","}]);"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":24},"end":{"row":5,"column":32},"action":"remove","lines":["payments"]},{"start":{"row":5,"column":24},"end":{"row":5,"column":25},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":25},"end":{"row":5,"column":26},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":26},"end":{"row":5,"column":27},"action":"insert","lines":["m"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":27},"end":{"row":5,"column":28},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":28},"end":{"row":5,"column":29},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":29},"end":{"row":5,"column":30},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":30},"end":{"row":5,"column":31},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":31},"end":{"row":5,"column":32},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":32},"end":{"row":5,"column":33},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":33},"end":{"row":5,"column":34},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":34},"end":{"row":5,"column":35},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":0},"end":{"row":16,"column":5},"action":"remove","lines":["  $routeProvider.when('/order_review', {","    templateUrl: 'partials/payments/order_review.html',","    controller: 'OrderReviewCtrl'","  });","  $routeProvider.when('/payments/:id', {","    templateUrl: 'partials/payments/payments.html',","    controller: 'PaymentsCtrl'","  });"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":0},"end":{"row":10,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":27},"end":{"row":6,"column":35},"action":"remove","lines":["payments"]},{"start":{"row":6,"column":27},"end":{"row":6,"column":28},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":28},"end":{"row":6,"column":29},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":29},"end":{"row":6,"column":30},"action":"insert","lines":["m"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":30},"end":{"row":6,"column":31},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":31},"end":{"row":6,"column":32},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":33},"end":{"row":6,"column":41},"action":"remove","lines":["payments"]},{"start":{"row":6,"column":33},"end":{"row":6,"column":44},"action":"insert","lines":["admin_panel"]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":17},"end":{"row":7,"column":25},"action":"remove","lines":["Payments"]},{"start":{"row":7,"column":17},"end":{"row":7,"column":18},"action":"insert","lines":["A"]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":18},"end":{"row":7,"column":19},"action":"insert","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":19},"end":{"row":7,"column":20},"action":"insert","lines":["m"]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":20},"end":{"row":7,"column":21},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":21},"end":{"row":7,"column":22},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":22},"end":{"row":7,"column":23},"action":"insert","lines":["P"]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":23},"end":{"row":7,"column":24},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":24},"end":{"row":7,"column":25},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":25},"end":{"row":7,"column":26},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":26},"end":{"row":7,"column":27},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":11,"column":21},"end":{"row":11,"column":36},"action":"remove","lines":["OrderReviewCtrl"]},{"start":{"row":11,"column":21},"end":{"row":11,"column":35},"action":"insert","lines":["AdminPanelCtrl"]}]}],[{"group":"doc","deltas":[{"start":{"row":13,"column":0},"end":{"row":18,"column":4},"action":"remove","lines":["  $scope.DeliveryDayAndTimeOptions = [","    'Quinta-feira a tarde'","    , 'Quinta-feira a noite'","    , 'Sábado pela manhã'","    , 'Sábado a tarde'","  ];"]}]}],[{"group":"doc","deltas":[{"start":{"row":54,"column":21},"end":{"row":54,"column":33},"action":"remove","lines":["PaymentsCtrl"]},{"start":{"row":54,"column":21},"end":{"row":54,"column":35},"action":"insert","lines":["AdminPanelCtrl"]}]}],[{"group":"doc","deltas":[{"start":{"row":17,"column":0},"end":{"row":52,"column":4},"action":"remove","lines":["payments.controller('OrderReviewCtrl', ['$scope','$http', '$filter', '$routeParams', function($scope, $http, $filter, $routeParams) {","  ","    $scope.country = 'Brasil';","    ","    function jsonp_callback(data){","      ","      console.log('jsonpcall');","      ","    }","","    $scope.$watch('cep', function(newValue, oldValue) {","      ","      var cep = newValue ? newValue.match(/\\d+/) : '';","","      if(cep.toString().length == 8){","        ","        $http.jsonp('//api.postmon.com.br/v1/cep/'+cep+'?callback=JSON_CALLBACK')","        .success(function(res) {","          ","          $scope.street = res.logradouro || '';","          $scope.district = res.bairro || '';","          $scope.city = res.cidade || '';","          $scope.state = res.estado || '';","        ","        })","        .error(function(err) {","        ","            console.error('ERR', err);","        ","        });","        ","      }","","    });","","}]);"]}]}],[{"group":"doc","deltas":[{"start":{"row":17,"column":0},"end":{"row":18,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":17,"column":0},"end":{"row":18,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":17,"column":26},"end":{"row":17,"column":31},"action":"remove","lines":["Panel"]},{"start":{"row":17,"column":26},"end":{"row":17,"column":27},"action":"insert","lines":["U"]}]}],[{"group":"doc","deltas":[{"start":{"row":17,"column":27},"end":{"row":17,"column":28},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":17,"column":28},"end":{"row":17,"column":29},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":17,"column":29},"end":{"row":17,"column":30},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":13,"column":0},"end":{"row":13,"column":4},"action":"insert","lines":["    "]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":13,"column":4},"end":{"row":13,"column":4},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1427487064794,"hash":"dfe46a47b0f6c4c9ca1b03009b5c06d24907d34b"}