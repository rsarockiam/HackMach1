'use strict';

/**
 * @ngdoc function
 * @name lighthouseApp.controller:CheckoutCtrl
 * @description
 * # LineupCtrl
 * Controller of the lighthouseApp
 */

angular.module('vzMach')
  .controller('recommendedPlanController', ['$scope', '$state', '$rootScope', '$timeout','vzService',
	function ($scope, $state, $rootScope, $timeout, vzService) {
	    var vm = this;
	    vm.index = 0;
	    vm.listIndex = 0;
	    var zipcode = vzService.getZipcode();
	    vzService.getRecommendPlans(zipcode).then(function (data) {
	        console.log(data);
	    })
	    vm.slides = [
          {
              text: 'Triple Play',
              plans: [
                  {
                      planName: "Triple Play 1",
                      Description: "Triple Play 1 Description",
                  },
                  {
                      planName: "Triple Play 2",
                      Description: "Triple Play 2 Description",
                  },
                  {
                      planName: "Triple Play 3",
                      Description: "Triple Play 3 Description",
                  },
                  {
                      planName: "Triple Play 4",
                      Description: "Triple Play 4 Description",
                  },
              ]

          },
          {
              text: 'Double Play',
              plans: [
                  {
                      planName: "Double Play 1",
                      Description: "Double Play 1 Description",
                  },
                  {
                      planName: "Double Play 2",
                      Description: "Double Play 2 Description",
                  },
                  {
                      planName: "Double Play 3",
                      Description: "Double Play 3 Description",
                  },
                  {
                      planName: "Double Play 4",
                      Description: "Double Play 4 Description",
                  },
              ]
          },
          {
              text: 'Standalone Internet',
              plans: [
                  {
                      planName: "Standalone Internet 1",
                      Description: "Standalone Internet 1 Description",
                  },
                  {
                      planName: "Standalone Internet 2",
                      Description: "Standalone Internet 2 Description",
                  },
                  {
                      planName: "Standalone Internet 3",
                      Description: "Standalone Internet 3 Description",
                  },
                  {
                      planName: "Standalone Internet 4",
                      Description: "Standalone Internet 4 Description",
                  },
              ]
          },
          {
              text: 'Standalone TV'
              ,
              plans: [
                  {
                      planName: "Standalone TV 1",
                      Description: "Standalone TV 1 Description",
                  },
                  {
                      planName: "Standalone TV 2",
                      Description: "Standalone TVt 2 Description",
                  },
                  {
                      planName: "Standalone TV 3",
                      Description: "Standalone TV 3 Description",
                  },
                  {
                      planName: "Standalone TV 4",
                      Description: "Standalone TV 4 Description",
                  },
              ]
          }
	    ];

	    vm.goNext = function () {
	        vm.index = (vm.index + 1) % (vm.slides.length);
	        vm.listIndex = 0;
	    };
	    vm.goPrev = function ()
	    {
	        if (vm.index == 0)
	            vm.index = vm.slides.length;
	        vm.index--;
	        vm.listIndex = 0;
	    };
	    vm.goNextPlan = function () {
	        vm.listIndex = (vm.listIndex + 1) % (vm.slides[vm.index].plans.length);
	    }
	    vm.goPrevPlan = function () {
	        if (vm.listIndex == 0)
	            vm.listIndex = vm.slides[vm.index].plans.length;
	        vm.listIndex--;
	    }

	    return vm;
	}
  ]);
