'use strict';

/**
 * @ngdoc function
 * @name lighthouseApp.controller:CheckoutCtrl
 * @description
 * # LineupCtrl
 * Controller of the lighthouseApp
 */

angular.module('vzMach')
  .controller('byobController', ['$scope', '$state', '$rootScope', '$timeout',
	function ($scope, $state, $rootScope, $timeout) {


	    var vm = this;
	    vm.isTvOnly = false;
	    vm.isDataOnly = false;
	    vm.isBoth = true;

	    //Slider config with custom display function
	    $scope.slider_translate = {
	        minValue: 100,
	        maxValue: 150,
	        options: {
	            ceil: 200,
	            floor: 0,
	            showTicksValues: true,
	            step: 50,
	            translate: function (value) {
	                return '$' + value;
	            }
	        }
	    };


	    vm.checkoutButton = true;
	    vm.checkoutButtonClick = function () {
	        $state.go('review');
	    };
	    vm.onPlanSelect = function(bundleId)
	    {
	        //check select /deselect
	        //update bundle id to cart
	    };
	    vm.init = function ()
	    { };
	    vm.init();
	    return vm;
	}
  ]);