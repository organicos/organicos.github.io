angular.module('myApp').controller('NavBarCtrl', function($scope, $localStorage) {
    
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