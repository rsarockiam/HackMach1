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
	    var state = vzService.getState();
	    var result = {};
	    vzService.getRecommendPlans(zipcode).then(function (data) {
	        result = JSON.parse(data);
            console.log(result)
	        fillData();
	    })
	    vm.slides=[];
	    //{"NewlyReleasedBundle":[{"BundleId":"B0031","Type":"CORE","Name":"DoublePlay",
	    //    "Price":"124.98","DAT":"100M","TV":"Extreme","VOICE":"","ROUTER":"","Discount":"","Keyword":"DAT_TV"}],
        //    "ZipPopularBundle":[{"BundleId":"B0004","Type":"CORE","Name":"TriplePlay","Price":"139.98","DAT":"50M","TV":"Ultimate",
        //        "VOICE":"Unlimited","ROUTER":"","Discount":"","Keyword":"DAT_TV_VOICE"}],
        //    "CntryPopularBundle":[{"BundleId":"B0008","Type":"CORE","Name":"TriplePlay",
        //        "Price":"89.99","DAT":"75M","TV":"Ultimate","VOICE":"Unlimited",
        //        "ROUTER":"","Discount":"","Keyword":"DAT_TV_VOICE"}],
        //    "SubPopularBundle":[{"BundleId":"C0004","Type":"COMP",
        //        "Name":"Equipment","Price":"24.99","DAT":"","TV":"1 TV+ Enhanced Recording","VOICE":"","ROUTER":"BHR5","Discount":"","Keyword":"REC_ROT"}]}
	    function fillData() {
	        var obj = {};
	        vm.slides = [];
	        constructVwObject(result.NewlyReleasedBundle, "Newly Released");
	        constructVwObject(result.ZipPopularBundle, "Popular in "+state);
	        constructVwObject(result.CntryPopularBundle, "Popular in US");
	        function constructVwObject(bundles, categoryName) {
	            obj = {};
	            obj.plans = [];
	            obj.text = categoryName;
	            for (var i = 0 ; i < bundles.length; i++) {
	                var planObj = {};
	                planObj.planName = bundles[i].Name;
	                planObj.Description = "";
	                if (bundles[i].DAT != "")
	                    planObj.Description += bundles[i].DAT + " Internet  ";
	                if (bundles[i].TV != "")
	                    planObj.Description += "+ " + bundles[i].TV + " TV";
	                if (bundles[i].VOICE != "")
	                    planObj.Description += "+ " + bundles[i].VOICE + " Voice";
	                planObj.Price = bundles[i].Price;
	                obj.plans.push(planObj);
	            }
	            vm.slides.push(obj);
	        }
	    }

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
