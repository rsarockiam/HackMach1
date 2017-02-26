'use strict';

/**
 * @ngdoc function
 * @name lighthouseApp.controller:CheckoutCtrl
 * @description
 * # LineupCtrl
 * Controller of the lighthouseApp
 */

angular.module('vzMach')
  .controller('recommendedPlanController', ['$scope', '$state', '$rootScope', '$timeout',
	function ($scope, $state, $rootScope, $timeout) {
	    var vm = this;
	    vm.slides = [
          {
              text: 'Triple Play'
          },
          {
              text: 'Double Play'
          },
          {
              text: 'Standalone Internet'
          },
          {
              text: 'Standalone TV'
          }
	    ];
	    return vm;
	}
  ]);
