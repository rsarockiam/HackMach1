'use strict';

/**
 * @ngdoc function
 * @name lighthouseApp.controller:CheckoutCtrl
 * @description
 * # LineupCtrl
 * Controller of the lighthouseApp
 */

angular.module('vzMach')
  .controller('landingController', ['$scope', '$state', '$rootScope', '$timeout','vzService',
	function ($scope, $state, $rootScope, $timeout, vzService) {
	    var vm = this;
	    vm.update = function () {
	        $state.go("recommended");
	    };
	    vm.continue = function () {
	        $state.go("recommended");
	    };
	    vzService.getIP().then(function (data) {
	        vm.city = data.city;
	        vm.state = vzService.getStateCode(data.region);
	        vm.zipcode = parseInt(data.postal);
	    })
	    vm.getZipInfo = function () {
	        if (vm.zipcode.toString().length == 5)
	        {
	            vzService.getZipDetails(vm.zipcode).then(function (data) {
	                vm.city = data.city;
	                vm.state = data.state;
	            })
	        }
	    }
	    vm.continueWithoutStreetAddress = function () {
	        vzService.setZipcode(vm.zipcode)
	        vzService.setState(vm.state)
	        $state.go("recommendedPlan");
	    }
	   
	    return vm;
	}
  ]);
