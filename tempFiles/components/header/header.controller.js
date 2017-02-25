'use strict';

/**
 * @ngdoc function
 * @name lighthouseApp.controller:CheckoutCtrl
 * @description
 * # LineupCtrl
 * Controller of the lighthouseApp
 */

angular.module('lighthouseApp')
  .controller('HeaderCtrl', ['$scope', '$state', '$rootScope', '$timeout',
	function ($scope, $state, $rootScope, $timeout) {
	    $scope.cartTotal = $rootScope.formatPrice(0);
	    $scope.itemRemoved = false;
	    $scope.itemAdded = false;
	    $scope.showCart = false;
	    $scope.isCartHeaderVisible = true;
	    $scope.isCartContentVisible = false;
	    var disabled = $scope.disabled = false;
	    $scope.services = {};
	    var timeout;

	    var resetCart = function () {
	        $scope.cartTotal = $scope.newCartTotal;

	        $scope.newCartTotal = undefined;
	        $scope.itemRemoved = false;
	        $scope.itemAdded = false;
	        if (timeout) $timeout.cancel(timeout);
	    }

	    $scope.gotoReview = function () {
	        console.log('gotoReview');
	        if (!disabled)
	            $state.go('review');
	        $scope.showCart = false;
	    }

	    $scope.toggleCart = function () {
	        console.log('toggleCart');
	        if ($scope.cartTotal != "$0.00") {
	            $scope.showCart = !$scope.showCart;
	        }
	    }

	    $scope.hasTV = function () {
	        return $scope.services.TV.Plans.length != null
	    }

	    $scope.hasInternet = function () {
	        return $scope.services.Internet != undefined;
	    }

	    $scope.$on('LoopqualCtrl.isScrolled', function (event, params) {
	        $scope.isScrolled = params.isScrolled;
	        $scope.$apply();
	    });
	    $scope.$on('Cart.showCart', function (event, params) {
	        if (params.isVisible) {
	            $scope.isCartHeaderVisible = true;
	            $scope.isCartContentVisible = true;
	        }
	        else {
	            $scope.isCartHeaderVisible = false;
	            $scope.isCartContentVisible = false;
	        }
	    });
	    $scope.$on('CartSvc.service', function (event, params) {
	        resetCart();
	        if (params.data.TotalPrice == null) {
	            $scope.newCartTotal = $rootScope.formatPrice(0);
	        }
	        else {
	            for (var i = 0; i < params.data.Services.length; i++) {
	                $scope.services[params.data.Services[i].ServiceTitle] = params.data.Services[i];
	            }
	            console.log('CartSvc.service', params.data, $scope.services)
	            $scope.itemAdded = true;

	            $scope.newCartTotal = $rootScope.formatPrice(params.data.TotalPrice);
	        }
	        if (timeout) $timeout.cancel(timeout);
	        timeout = $timeout(resetCart, 1000);
	    });
	    $scope.$on('CartSvc.itemAdded', function (event) {
	        console.log('CartSvc.itemAdded');
	        //      $scope.itemAdded = true;
	        //      $scope.itemRemoved = false;
	    });
	    $scope.$on('CartSvc.itemRemoved', function (event) {
	        console.log('CartSvc.itemRemoved');
	        resetCart();
	        //      $scope.itemRemoved = true;
	        //      $scope.itemAdded = false;
	    });
	}
  ]);
