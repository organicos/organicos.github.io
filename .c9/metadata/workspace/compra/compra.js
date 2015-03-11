{"filter":false,"title":"compra.js","tooltip":"/compra/compra.js","undoManager":{"mark":28,"position":28,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":21,"column":4},"action":"insert","lines":["'use strict';","","var vitrine = angular.module('myApp.vitrine', ['ngRoute'])","","vitrine.config(['$routeProvider', function($routeProvider) {","  $routeProvider.when('/vitrine', {","    templateUrl: 'vitrine/vitrine.html',","    controller: 'VitrineCtrl'","  });","}])","","vitrine.controller('VitrineCtrl', ['$scope','$http', function($scope, $http) {","\tvar VitrineCtrl = this;","\tVitrineCtrl.products = [];","    // http://104.154.82.56/api/products - URL do recurso","    $http.get('vitrine/produtos.json').then(function(resp) {","        VitrineCtrl.products = resp.data;","    }, function(err) {","        console.error('ERR', err);","        // err.status will contain the status code","    });","}]);"]}]}],[{"group":"doc","deltas":[{"start":{"row":2,"column":4},"end":{"row":2,"column":11},"action":"remove","lines":["vitrine"]},{"start":{"row":2,"column":4},"end":{"row":2,"column":5},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":2,"column":5},"end":{"row":2,"column":6},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":2,"column":6},"end":{"row":2,"column":7},"action":"insert","lines":["m"]}]}],[{"group":"doc","deltas":[{"start":{"row":2,"column":7},"end":{"row":2,"column":8},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":2,"column":8},"end":{"row":2,"column":9},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":2,"column":9},"end":{"row":2,"column":10},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":2,"column":35},"end":{"row":2,"column":42},"action":"remove","lines":["vitrine"]},{"start":{"row":2,"column":35},"end":{"row":2,"column":41},"action":"insert","lines":["compra"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":0},"end":{"row":4,"column":7},"action":"remove","lines":["vitrine"]},{"start":{"row":4,"column":0},"end":{"row":4,"column":6},"action":"insert","lines":["compra"]}]}],[{"group":"doc","deltas":[{"start":{"row":5,"column":24},"end":{"row":5,"column":31},"action":"remove","lines":["vitrine"]},{"start":{"row":5,"column":24},"end":{"row":5,"column":30},"action":"insert","lines":["compra"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":18},"end":{"row":6,"column":25},"action":"remove","lines":["vitrine"]},{"start":{"row":6,"column":18},"end":{"row":6,"column":24},"action":"insert","lines":["compra"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":25},"end":{"row":6,"column":32},"action":"remove","lines":["vitrine"]},{"start":{"row":6,"column":25},"end":{"row":6,"column":31},"action":"insert","lines":["compra"]}]}],[{"group":"doc","deltas":[{"start":{"row":11,"column":0},"end":{"row":11,"column":7},"action":"remove","lines":["vitrine"]},{"start":{"row":11,"column":0},"end":{"row":11,"column":6},"action":"insert","lines":["compra"]}]}],[{"group":"doc","deltas":[{"start":{"row":15,"column":15},"end":{"row":15,"column":22},"action":"remove","lines":["vitrine"]},{"start":{"row":15,"column":15},"end":{"row":15,"column":21},"action":"insert","lines":["compra"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":25},"end":{"row":6,"column":31},"action":"remove","lines":["compra"]},{"start":{"row":6,"column":25},"end":{"row":6,"column":26},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":26},"end":{"row":6,"column":27},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":27},"end":{"row":6,"column":28},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":28},"end":{"row":6,"column":29},"action":"insert","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":29},"end":{"row":6,"column":30},"action":"insert","lines":["1"]}]}],[{"group":"doc","deltas":[{"start":{"row":6,"column":29},"end":{"row":6,"column":30},"action":"insert","lines":["_"]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":17},"end":{"row":7,"column":24},"action":"remove","lines":["Vitrine"]},{"start":{"row":7,"column":17},"end":{"row":7,"column":23},"action":"insert","lines":["compra"]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":17},"end":{"row":7,"column":18},"action":"remove","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":7,"column":17},"end":{"row":7,"column":18},"action":"insert","lines":["C"]}]}],[{"group":"doc","deltas":[{"start":{"row":12,"column":5},"end":{"row":12,"column":16},"action":"remove","lines":["VitrineCtrl"]},{"start":{"row":12,"column":5},"end":{"row":12,"column":15},"action":"insert","lines":["CompraCtrl"]}]}],[{"group":"doc","deltas":[{"start":{"row":13,"column":1},"end":{"row":13,"column":12},"action":"remove","lines":["VitrineCtrl"]},{"start":{"row":13,"column":1},"end":{"row":13,"column":11},"action":"insert","lines":["CompraCtrl"]}]}],[{"group":"doc","deltas":[{"start":{"row":11,"column":19},"end":{"row":11,"column":30},"action":"remove","lines":["VitrineCtrl"]},{"start":{"row":11,"column":19},"end":{"row":11,"column":29},"action":"insert","lines":["CompraCtrl"]}]}],[{"group":"doc","deltas":[{"start":{"row":16,"column":8},"end":{"row":16,"column":19},"action":"remove","lines":["VitrineCtrl"]},{"start":{"row":16,"column":8},"end":{"row":16,"column":18},"action":"insert","lines":["CompraCtrl"]}]}],[{"group":"doc","deltas":[{"start":{"row":2,"column":56},"end":{"row":2,"column":57},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":9,"column":3},"end":{"row":9,"column":4},"action":"insert","lines":[";"]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":9,"column":4},"end":{"row":9,"column":4},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1425473151645,"hash":"f7f15a669d196a047b07e360e91d6d06ee1a3431"}