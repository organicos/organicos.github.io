angular.module('myApp').service('basketService', ['$modal', '$localStorage', '$filter', function ($modal, $localStorage, $filter) {
    
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