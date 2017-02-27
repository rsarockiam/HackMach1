'use strict';

/**
 * @ngdoc function
 * @name lighthouseApp.controller:CheckoutCtrl
 * @description
 * # LineupCtrl
 * Controller of the lighthouseApp
 */

angular.module('vzMach')
  .controller('byobController', ['$scope', '$state', '$rootScope', '$timeout','vzService',
	function ($scope, $state, $rootScope, $timeout,vzService) {


	    var vm = this;
	    vm.isTvOnly = false;
	    vm.isDataOnly = false;
	    vm.isBoth = true;

	    //Minimal slider config
	    $scope.minSlider = {
	        value: 10
	    };

	    //Slider with selection bar
	    $scope.slider_visible_bar = {
	        value: 10,
	        options: {
	            showSelectionBar: true
	        }
	    };

	    //Range slider config
	    $scope.minRangeSlider = {
	        minValue: 10,
	        maxValue: 90,
	        options: {
	            floor: 0,
	            ceil: 100,
	            step: 1
	        }
	    };

	    //Slider with selection bar
	    $scope.color_slider_bar = {
	        value: 12,
	        options: {
	            showSelectionBar: true,
	            getSelectionBarColor: function (value) {
	                if (value <= 3)
	                    return 'red';
	                if (value <= 6)
	                    return 'orange';
	                if (value <= 9)
	                    return 'yellow';
	                return '#2AE02A';
	            }
	        }
	    };

	    //Slider config with floor, ceil and step
	    $scope.slider_floor_ceil = {
	        value: 12,
	        options: {
	            floor: 10,
	            ceil: 100,
	            step: 5
	        }
	    };

	    //Slider config with callbacks
	    $scope.slider_callbacks = {
	        value: 100,
	        options: {
	            onStart: function () {
	                $scope.otherData.start = $scope.slider_callbacks.value * 10;
	            },
	            onChange: function () {
	                $scope.otherData.change = $scope.slider_callbacks.value * 10;
	            },
	            onEnd: function () {
	                $scope.otherData.end = $scope.slider_callbacks.value * 10;
	            }
	        }
	    };
	    $scope.otherData = {
	        start: 0,
	        change: 0,
	        end: 0
	    };

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

	    //Slider config with steps array of letters
	    $scope.slider_alphabet = {
	        value: 0,
	        options: {
	            stepsArray: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
	        }
	    };

	    //Slider with ticks
	    $scope.slider_ticks = {
	        value: 5,
	        options: {
	            ceil: 10,
	            floor: 0,
	            showTicks: true
	        }
	    };



	    //Slider with draggable range
	    $scope.slider_all_options = {
	        minValue: 2,
	        options: {
	            floor: 0,
	            ceil: 10,
	            step: 1,
	            precision: 0,
	            draggableRange: false,
	            showSelectionBar: false,
	            hideLimitLabels: false,
	            readOnly: false,
	            disabled: false,
	            showTicks: false,
	            showTicksValues: false
	        }
	    };
	    $scope.toggleHighValue = function () {
	        if ($scope.slider_all_options.maxValue != null) {
	            $scope.slider_all_options.maxValue = undefined;
	        } else {
	            $scope.slider_all_options.maxValue = 8;
	        }
	    }
	    vm.checkoutButton = true;
	    vm.checkoutButtonClick = function () {
	        $state.go('review');
	    };
	    vm.onPlanSelect = function(bundleId,plan)
	    {
	        //check select /deselect
	        //update bundle id to cart
	        if (plan.isSelected)
	        {
	            vzService.UpdateCart("").then(function (isUpdated) {
	                if (isUpdated)
	                {
	                    plan.isSelected = false;
	                    console.log("Unselected");
	                } 
	            })
	        }
	        else {
	            var planObj = _.filter(vm.plans, function (plan) {
	                return plan.isSelected == true;
	            });
	            planObj.isSelected = false;
	            vzService.UpdateCart(bundleId).then(function (isUpdated) {
	                if (isUpdated) {
	                    plan.isSelected = true;
	                    console.log("Selected");
	                }

	            })
	        }
	    };
	    vm.init = function ()
	    {
	        vm.plans = [];
	        vm.getAllPlans = function () {
	            vzService.getAllPlans("").then(function (data) {
	                constructVwObject(JSON.parse(data));
	            })
	        }
	        vm.getAllPlans();
	    };
	    vm.init();
	    function constructVwObject(bundles) {
	        for (var i = 0 ; i < bundles.length; i++) {
	            var planObj = {};
	            planObj.Name = bundles[i].Name;
	            planObj.Description = "";
	            if (bundles[i].DAT != "")
	                planObj.Description += bundles[i].DAT + " Internet  ";
	            if (bundles[i].TV != "")
	                planObj.Description += "+ " + bundles[i].TV + " TV";
	            if (bundles[i].VOICE != "")
	                planObj.Description += "+ " + bundles[i].VOICE + " Voice";
	            if (bundles[i].Router != "" && (bundles[i].TV != "" || bundles[i].DAT != ""))
	                planObj.Description += "+ Fios Quantum Router";
	            else if (bundles[i].Router != "" && bundles[i].TV == "" && bundles[i].DAT == "")
	                planObj.Description += " Fios Quantum Router";
	            if (planObj.Name.toLowerCase().indexOf('tv') > 0)
	                planObj.isTvOnly = true;
	            else if (planObj.Name.toLowerCase().indexOf('data') > 0)
	                planObj.isDataOnly = true;
	            else
	            {
	                planObj.isTvOnly = false;
	                planObj.isDataOnly = false;
	            }
	            planObj.BundleId = bundles[i].BundleId;
	            planObj.Price = parseFloat(bundles[i].Price);
	            planObj.isSelected = false;
	            vm.plans.push(planObj);
	        }
	    }
	    vm.filterName = "All types of Plans";
	    vm.setTV = function () {
	      
	        vm.isTvOnly = true;
	        vm.isDataOnly = false;
	        vm.isBoth = false;
	        vm.filterName = "TV only plans";
	    }
	    vm.setData = function () {

	        vm.isTvOnly = false;
	        vm.isDataOnly = true;
	        vm.isBoth = false;
	        vm.filterName = "Data only plans";
	    }
	    vm.setBoth = function () {
	  
	        vm.isTvOnly = false;
	        vm.isDataOnly = false;
	        vm.isBoth = true;
	        vm.filterName = "All types of Plans";
	    }
	    return vm;
	}
  ]);