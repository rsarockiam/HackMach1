'use strict';

/**
 * @ngdoc function
 * @name lighthouseApp.controller:CheckoutCtrl
 * @description
 * # LineupCtrl
 * Controller of the lighthouseApp
 */

angular.module('vzMach')
  .controller('landingController', ['$scope', '$state', '$rootScope', '$timeout',
	function ($scope, $state, $rootScope, $timeout) {
	    var vm = this;
	    vm.update = function () {
	        $state.go("recommended");
	    };
	    vm.continue = function () {
	        $state.go("recommended");
	    };
	    return vm;
	}
  ]);
