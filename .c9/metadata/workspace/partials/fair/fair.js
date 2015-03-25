{"filter":false,"title":"fair.js","tooltip":"/partials/fair/fair.js","undoManager":{"mark":93,"position":93,"stack":[[{"group":"doc","deltas":[{"start":{"row":156,"column":22},"end":{"row":156,"column":23},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":16,"column":5},"end":{"row":17,"column":0},"action":"insert","lines":["",""]},{"start":{"row":17,"column":0},"end":{"row":17,"column":2},"action":"insert","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":17,"column":2},"end":{"row":18,"column":0},"action":"insert","lines":["",""]},{"start":{"row":18,"column":0},"end":{"row":18,"column":2},"action":"insert","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":18,"column":2},"end":{"row":19,"column":0},"action":"insert","lines":["",""]},{"start":{"row":19,"column":0},"end":{"row":19,"column":2},"action":"insert","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":19,"column":0},"end":{"row":19,"column":2},"action":"remove","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":19,"column":0},"end":{"row":37,"column":5},"action":"insert","lines":["    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {","            return {","                'request': function (config) {","                    config.headers = config.headers || {};","                    if ($localStorage.token) {","                        config.headers.Authorization = 'Bearer ' + $localStorage.token;","                    }","                    return config;","                },","                'responseError': function(response) {","                    if(response.status === 401 || response.status === 403) {","                        $location.path('/signin');","                    }","                    return $q.reject(response);","                }","            };","        }]);","","    }"]}]}],[{"group":"doc","deltas":[{"start":{"row":19,"column":0},"end":{"row":19,"column":2},"action":"remove","lines":["  "]},{"start":{"row":20,"column":0},"end":{"row":20,"column":2},"action":"remove","lines":["  "]},{"start":{"row":21,"column":0},"end":{"row":21,"column":2},"action":"remove","lines":["  "]},{"start":{"row":22,"column":0},"end":{"row":22,"column":2},"action":"remove","lines":["  "]},{"start":{"row":23,"column":0},"end":{"row":23,"column":2},"action":"remove","lines":["  "]},{"start":{"row":24,"column":0},"end":{"row":24,"column":2},"action":"remove","lines":["  "]},{"start":{"row":25,"column":0},"end":{"row":25,"column":2},"action":"remove","lines":["  "]},{"start":{"row":26,"column":0},"end":{"row":26,"column":2},"action":"remove","lines":["  "]},{"start":{"row":27,"column":0},"end":{"row":27,"column":2},"action":"remove","lines":["  "]},{"start":{"row":28,"column":0},"end":{"row":28,"column":2},"action":"remove","lines":["  "]},{"start":{"row":29,"column":0},"end":{"row":29,"column":2},"action":"remove","lines":["  "]},{"start":{"row":30,"column":0},"end":{"row":30,"column":2},"action":"remove","lines":["  "]},{"start":{"row":31,"column":0},"end":{"row":31,"column":2},"action":"remove","lines":["  "]},{"start":{"row":32,"column":0},"end":{"row":32,"column":2},"action":"remove","lines":["  "]},{"start":{"row":33,"column":0},"end":{"row":33,"column":2},"action":"remove","lines":["  "]},{"start":{"row":34,"column":0},"end":{"row":34,"column":2},"action":"remove","lines":["  "]},{"start":{"row":35,"column":0},"end":{"row":35,"column":2},"action":"remove","lines":["  "]},{"start":{"row":37,"column":0},"end":{"row":37,"column":2},"action":"remove","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":3},"end":{"row":37,"column":4},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":3},"end":{"row":37,"column":4},"action":"remove","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":0},"end":{"row":37,"column":3},"action":"remove","lines":["  }"]}]}],[{"group":"doc","deltas":[{"start":{"row":36,"column":0},"end":{"row":37,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":19,"column":2},"end":{"row":19,"column":4},"action":"insert","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":19,"column":4},"end":{"row":19,"column":6},"action":"insert","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":19,"column":0},"end":{"row":19,"column":2},"action":"remove","lines":["  "]},{"start":{"row":20,"column":0},"end":{"row":20,"column":2},"action":"remove","lines":["  "]},{"start":{"row":21,"column":0},"end":{"row":21,"column":2},"action":"remove","lines":["  "]},{"start":{"row":22,"column":0},"end":{"row":22,"column":2},"action":"remove","lines":["  "]},{"start":{"row":23,"column":0},"end":{"row":23,"column":2},"action":"remove","lines":["  "]},{"start":{"row":24,"column":0},"end":{"row":24,"column":2},"action":"remove","lines":["  "]},{"start":{"row":25,"column":0},"end":{"row":25,"column":2},"action":"remove","lines":["  "]},{"start":{"row":26,"column":0},"end":{"row":26,"column":2},"action":"remove","lines":["  "]},{"start":{"row":27,"column":0},"end":{"row":27,"column":2},"action":"remove","lines":["  "]},{"start":{"row":28,"column":0},"end":{"row":28,"column":2},"action":"remove","lines":["  "]},{"start":{"row":29,"column":0},"end":{"row":29,"column":2},"action":"remove","lines":["  "]},{"start":{"row":30,"column":0},"end":{"row":30,"column":2},"action":"remove","lines":["  "]},{"start":{"row":31,"column":0},"end":{"row":31,"column":2},"action":"remove","lines":["  "]},{"start":{"row":32,"column":0},"end":{"row":32,"column":2},"action":"remove","lines":["  "]},{"start":{"row":33,"column":0},"end":{"row":33,"column":2},"action":"remove","lines":["  "]},{"start":{"row":34,"column":0},"end":{"row":34,"column":2},"action":"remove","lines":["  "]},{"start":{"row":35,"column":0},"end":{"row":35,"column":2},"action":"remove","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":19,"column":0},"end":{"row":19,"column":2},"action":"remove","lines":["  "]},{"start":{"row":20,"column":0},"end":{"row":20,"column":2},"action":"remove","lines":["  "]},{"start":{"row":21,"column":0},"end":{"row":21,"column":2},"action":"remove","lines":["  "]},{"start":{"row":22,"column":0},"end":{"row":22,"column":2},"action":"remove","lines":["  "]},{"start":{"row":23,"column":0},"end":{"row":23,"column":2},"action":"remove","lines":["  "]},{"start":{"row":24,"column":0},"end":{"row":24,"column":2},"action":"remove","lines":["  "]},{"start":{"row":25,"column":0},"end":{"row":25,"column":2},"action":"remove","lines":["  "]},{"start":{"row":26,"column":0},"end":{"row":26,"column":2},"action":"remove","lines":["  "]},{"start":{"row":27,"column":0},"end":{"row":27,"column":2},"action":"remove","lines":["  "]},{"start":{"row":28,"column":0},"end":{"row":28,"column":2},"action":"remove","lines":["  "]},{"start":{"row":29,"column":0},"end":{"row":29,"column":2},"action":"remove","lines":["  "]},{"start":{"row":30,"column":0},"end":{"row":30,"column":2},"action":"remove","lines":["  "]},{"start":{"row":31,"column":0},"end":{"row":31,"column":2},"action":"remove","lines":["  "]},{"start":{"row":32,"column":0},"end":{"row":32,"column":2},"action":"remove","lines":["  "]},{"start":{"row":33,"column":0},"end":{"row":33,"column":2},"action":"remove","lines":["  "]},{"start":{"row":34,"column":0},"end":{"row":34,"column":2},"action":"remove","lines":["  "]},{"start":{"row":35,"column":0},"end":{"row":35,"column":2},"action":"remove","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":29},"end":{"row":4,"column":30},"action":"insert","lines":[","]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":30},"end":{"row":4,"column":31},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":31},"end":{"row":4,"column":33},"action":"insert","lines":["''"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":32},"end":{"row":4,"column":45},"action":"insert","lines":["$httpProvider"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":71},"end":{"row":4,"column":72},"action":"insert","lines":[","]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":72},"end":{"row":4,"column":73},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":73},"end":{"row":4,"column":86},"action":"insert","lines":["$httpProvider"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":73},"end":{"row":4,"column":86},"action":"remove","lines":["$httpProvider"]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":72},"end":{"row":4,"column":73},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":4,"column":71},"end":{"row":4,"column":72},"action":"remove","lines":[","]}]}],[{"group":"doc","deltas":[{"start":{"row":19,"column":0},"end":{"row":35,"column":6},"action":"remove","lines":["  $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {","      return {","          'request': function (config) {","              config.headers = config.headers || {};","              if ($localStorage.token) {","                  config.headers.Authorization = 'Bearer ' + $localStorage.token;","              }","              return config;","          },","          'responseError': function(response) {","              if(response.status === 401 || response.status === 403) {","                  $location.path('/signin');","              }","              return $q.reject(response);","          }","      };","  }]);"]}]}],[{"group":"doc","deltas":[{"start":{"row":18,"column":2},"end":{"row":19,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":18,"column":0},"end":{"row":18,"column":2},"action":"remove","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":17,"column":2},"end":{"row":18,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":17,"column":0},"end":{"row":17,"column":2},"action":"remove","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":16,"column":5},"end":{"row":17,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":48,"column":0},"end":{"row":52,"column":3},"action":"remove","lines":["\t$scope.basket = {","\t  total: 0,","\t  name: 'Minha cesta',","\t  products: []","\t};"]}]}],[{"group":"doc","deltas":[{"start":{"row":47,"column":0},"end":{"row":48,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":46,"column":3},"end":{"row":47,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":36},"end":{"row":26,"column":0},"action":"insert","lines":["",""]},{"start":{"row":26,"column":0},"end":{"row":26,"column":1},"action":"insert","lines":["\t"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":0},"end":{"row":26,"column":1},"action":"remove","lines":["\t"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":0},"end":{"row":30,"column":3},"action":"insert","lines":["\t$scope.basket = {","\t  total: 0,","\t  name: 'Minha cesta',","\t  products: []","\t};"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":6},"end":{"row":26,"column":7},"action":"remove","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":5},"end":{"row":26,"column":6},"action":"remove","lines":["p"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":4},"end":{"row":26,"column":5},"action":"remove","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":3},"end":{"row":26,"column":4},"action":"remove","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":2},"end":{"row":26,"column":3},"action":"remove","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":2},"end":{"row":26,"column":3},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":3},"end":{"row":26,"column":4},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":4},"end":{"row":26,"column":5},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":5},"end":{"row":26,"column":6},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":6},"end":{"row":26,"column":7},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":7},"end":{"row":26,"column":8},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":8},"end":{"row":26,"column":9},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":23},"end":{"row":182,"column":36},"action":"remove","lines":["$scope.basket"]},{"start":{"row":182,"column":23},"end":{"row":182,"column":38},"action":"insert","lines":["$storage.basket"]},{"start":{"row":186,"column":6},"end":{"row":186,"column":19},"action":"remove","lines":["$scope.basket"]},{"start":{"row":186,"column":6},"end":{"row":186,"column":21},"action":"insert","lines":["$storage.basket"]},{"start":{"row":193,"column":6},"end":{"row":193,"column":19},"action":"remove","lines":["$scope.basket"]},{"start":{"row":193,"column":6},"end":{"row":193,"column":21},"action":"insert","lines":["$storage.basket"]},{"start":{"row":197,"column":4},"end":{"row":197,"column":17},"action":"remove","lines":["$scope.basket"]},{"start":{"row":197,"column":4},"end":{"row":197,"column":19},"action":"insert","lines":["$storage.basket"]},{"start":{"row":203,"column":23},"end":{"row":203,"column":36},"action":"remove","lines":["$scope.basket"]},{"start":{"row":203,"column":23},"end":{"row":203,"column":38},"action":"insert","lines":["$storage.basket"]},{"start":{"row":207,"column":6},"end":{"row":207,"column":19},"action":"remove","lines":["$scope.basket"]},{"start":{"row":207,"column":6},"end":{"row":207,"column":21},"action":"insert","lines":["$storage.basket"]},{"start":{"row":209,"column":6},"end":{"row":209,"column":19},"action":"remove","lines":["$scope.basket"]},{"start":{"row":209,"column":6},"end":{"row":209,"column":21},"action":"insert","lines":["$storage.basket"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":1},"end":{"row":26,"column":16},"action":"remove","lines":["$storage.basket"]},{"start":{"row":26,"column":1},"end":{"row":26,"column":23},"action":"insert","lines":["$scope.$storage.basket"]},{"start":{"row":182,"column":23},"end":{"row":182,"column":38},"action":"remove","lines":["$storage.basket"]},{"start":{"row":182,"column":23},"end":{"row":182,"column":45},"action":"insert","lines":["$scope.$storage.basket"]},{"start":{"row":186,"column":6},"end":{"row":186,"column":21},"action":"remove","lines":["$storage.basket"]},{"start":{"row":186,"column":6},"end":{"row":186,"column":28},"action":"insert","lines":["$scope.$storage.basket"]},{"start":{"row":193,"column":6},"end":{"row":193,"column":21},"action":"remove","lines":["$storage.basket"]},{"start":{"row":193,"column":6},"end":{"row":193,"column":28},"action":"insert","lines":["$scope.$storage.basket"]},{"start":{"row":197,"column":4},"end":{"row":197,"column":19},"action":"remove","lines":["$storage.basket"]},{"start":{"row":197,"column":4},"end":{"row":197,"column":26},"action":"insert","lines":["$scope.$storage.basket"]},{"start":{"row":203,"column":23},"end":{"row":203,"column":38},"action":"remove","lines":["$storage.basket"]},{"start":{"row":203,"column":23},"end":{"row":203,"column":45},"action":"insert","lines":["$scope.$storage.basket"]},{"start":{"row":207,"column":6},"end":{"row":207,"column":21},"action":"remove","lines":["$storage.basket"]},{"start":{"row":207,"column":6},"end":{"row":207,"column":28},"action":"insert","lines":["$scope.$storage.basket"]},{"start":{"row":209,"column":6},"end":{"row":209,"column":21},"action":"remove","lines":["$storage.basket"]},{"start":{"row":209,"column":6},"end":{"row":209,"column":28},"action":"insert","lines":["$scope.$storage.basket"]}]}],[{"group":"doc","deltas":[{"start":{"row":180,"column":43},"end":{"row":181,"column":0},"action":"insert","lines":["",""]},{"start":{"row":181,"column":0},"end":{"row":181,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":181,"column":4},"end":{"row":182,"column":0},"action":"insert","lines":["",""]},{"start":{"row":182,"column":0},"end":{"row":182,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":4},"end":{"row":182,"column":5},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":5},"end":{"row":182,"column":6},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":6},"end":{"row":182,"column":7},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":7},"end":{"row":182,"column":8},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":8},"end":{"row":182,"column":9},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":9},"end":{"row":182,"column":10},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":10},"end":{"row":182,"column":11},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":11},"end":{"row":182,"column":12},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":12},"end":{"row":182,"column":13},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":13},"end":{"row":182,"column":14},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":14},"end":{"row":182,"column":15},"action":"insert","lines":["g"]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":15},"end":{"row":182,"column":17},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":16},"end":{"row":182,"column":18},"action":"insert","lines":["''"]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":17},"end":{"row":182,"column":18},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":18},"end":{"row":182,"column":19},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":19},"end":{"row":182,"column":20},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":20},"end":{"row":182,"column":21},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":182,"column":21},"end":{"row":182,"column":22},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":181,"column":0},"end":{"row":182,"column":24},"action":"remove","lines":["    ","    console.log('uhiuh')"]}]}],[{"group":"doc","deltas":[{"start":{"row":180,"column":43},"end":{"row":181,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":25,"column":36},"end":{"row":26,"column":0},"action":"insert","lines":["",""]},{"start":{"row":26,"column":0},"end":{"row":26,"column":1},"action":"insert","lines":["\t"]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":1},"end":{"row":27,"column":0},"action":"insert","lines":["",""]},{"start":{"row":27,"column":0},"end":{"row":27,"column":1},"action":"insert","lines":["\t"]}]}],[{"group":"doc","deltas":[{"start":{"row":27,"column":1},"end":{"row":27,"column":2},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":27,"column":2},"end":{"row":27,"column":3},"action":"insert","lines":["f"]}]}],[{"group":"doc","deltas":[{"start":{"row":27,"column":3},"end":{"row":27,"column":5},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":27,"column":4},"end":{"row":27,"column":26},"action":"insert","lines":["$scope.$storage.basket"]}]}],[{"group":"doc","deltas":[{"start":{"row":27,"column":27},"end":{"row":27,"column":28},"action":"insert","lines":["{"]}]}],[{"group":"doc","deltas":[{"start":{"row":27,"column":28},"end":{"row":29,"column":2},"action":"insert","lines":["","\t  ","\t}"]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":0},"end":{"row":30,"column":2},"action":"insert","lines":["  "]},{"start":{"row":31,"column":0},"end":{"row":31,"column":2},"action":"insert","lines":["  "]},{"start":{"row":32,"column":0},"end":{"row":32,"column":2},"action":"insert","lines":["  "]},{"start":{"row":33,"column":0},"end":{"row":33,"column":2},"action":"insert","lines":["  "]},{"start":{"row":34,"column":0},"end":{"row":34,"column":2},"action":"insert","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":30,"column":0},"end":{"row":34,"column":5},"action":"remove","lines":["  \t$scope.$storage.basket = {","  \t  total: 0,","  \t  name: 'Minha cesta',","  \t  products: []","  \t};"]}]}],[{"group":"doc","deltas":[{"start":{"row":28,"column":0},"end":{"row":32,"column":5},"action":"insert","lines":["  \t$scope.$storage.basket = {","  \t  total: 0,","  \t  name: 'Minha cesta',","  \t  products: []","  \t};"]}]}],[{"group":"doc","deltas":[{"start":{"row":27,"column":0},"end":{"row":33,"column":2},"action":"remove","lines":["\tif($scope.$storage.basket){","  \t$scope.$storage.basket = {","  \t  total: 0,","  \t  name: 'Minha cesta',","  \t  products: []","  \t};\t  ","\t}"]}]}],[{"group":"doc","deltas":[{"start":{"row":27,"column":0},"end":{"row":28,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":27,"column":0},"end":{"row":28,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":1},"end":{"row":27,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":2},"end":{"row":26,"column":3},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":26,"column":1},"end":{"row":26,"column":2},"action":"remove","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":41,"column":2},"end":{"row":42,"column":0},"action":"insert","lines":["",""]},{"start":{"row":42,"column":0},"end":{"row":42,"column":2},"action":"insert","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":0},"end":{"row":42,"column":2},"action":"remove","lines":["  "]}]}],[{"group":"doc","deltas":[{"start":{"row":41,"column":0},"end":{"row":47,"column":2},"action":"insert","lines":["\tif($scope.$storage.basket){","  \t$scope.$storage.basket = {","  \t  total: 0,","  \t  name: 'Minha cesta',","  \t  products: []","  \t};\t  ","\t}"]}]}],[{"group":"doc","deltas":[{"start":{"row":41,"column":4},"end":{"row":41,"column":5},"action":"insert","lines":["!"]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":17.195625,"selection":{"start":{"row":127,"column":21},"end":{"row":127,"column":25},"isBackwards":true},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":93,"state":"no_regex","mode":"ace/mode/javascript"}},"timestamp":1427152952852,"hash":"2db6a62b5785c648aea4ac4b72bfd22669d765b4"}