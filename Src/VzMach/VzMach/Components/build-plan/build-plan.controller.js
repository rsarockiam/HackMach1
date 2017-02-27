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
	    return vm;
	}
  ]);