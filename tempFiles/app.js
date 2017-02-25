/// <reference path="index.html" />
'use strict';
/**
 * @ngdoc overview
 * @name lighthouseApp
 * @description
 * # lighthouseApp
 *
 * Main module of the application.
 */
var TCLive = false;
var MobileFlow = false;
var ftvAvailable = false;
var globalInitializerurl = "../../Services/Common/GlobalInitializers/";
angular
  .module('lighthouseApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'ui.router',
    'environment',
    'bc.Flickity',
    'duScroll',
    'Services',
    'Constants',
    'Shared',
    'ui.bootstrap'
  ])
  .provider('globalInitializers', function globalInitializersProvider() {
      this.$get = function () {
          return {
              initialize: function () {
                  var initInjector = angular.injector(["ng"]);
                  var $http = initInjector.get("$http");
                  TCLive = false;
                  MobileFlow = false;

                  $http.get(globalInitializerurl + 'LH2_0')
                      .then(function (result) {
                          TCLive = result.data.TCLive;
                          MobileFlow = result.data.MobileFlow;
                          if (result.data.TCURL != "") {
                              var tcScript = document.createElement('script');
                              tcScript.id = "chatLib";
                              tcScript.setAttribute('src', result.data.TCURL);
                              document.body.appendChild(tcScript);
                          }
                          //if (result.data.TCAjaxURL != "") {
                          //    var ajaxScript = document.createElement('script');
                          //    ajaxScript.setAttribute('src', result.data.TCAjaxURL);
                          //    document.body.appendChild(ajaxScript);
                          //}
                      },
                      function (result) {
                      });
              }
          }
      }
  })
  .config(function (globalInitializersProvider, $stateProvider, $urlRouterProvider, $translateProvider, $logProvider) {
      //$logProvider.debugEnabled(true);
      //$urlRouterProvider.otherwise('/lbo');
      globalInitializersProvider.$get().initialize();

      $urlRouterProvider.rule(function ($i, $location) {
          var path = $location.path();
          var url = $location.url().replace(path, path.toLowerCase());
          var normalized = path.toLowerCase();
          if (path != normalized) return url;
      });
      $urlRouterProvider.otherwise("/");
      $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "bundle/components/loopqual/postloopqual.html",
            controller: "LoopqualCtrl"
        })
        .state('preconfig', {
            url: "/preconfig",
            templateUrl: "bundle/components/preconfig/preconfig.html",
            controller: "PreConfigCtrl"
        })
        .state('byo', {
            url: "/byo",
            templateUrl: 'bundle/components/workflow/workflow.html',
            params: {
                serviceType: null,
            },
            controller: 'WorkflowCtrl',
            controllerAs: 'vm'
        })
        .state('review', {
            url: "/review",
            templateUrl: 'bundle/components/review/review.html',
            controller: 'ReviewCtrl'
        })
        .state('edit', {
            url: "/change",
            params: {
                serviceType: null,
            },
            templateUrl: 'bundle/components/workflow/workflow.html',
            controller: 'WorkflowCtrl',
            controllerAs: 'vm'
        })
        .state('checkout', {
            url: "/checkout",
            templateUrl: "bundle/components/checkout/checkout.html",
            controller: "checkoutControllerLH",
            controllerAs: 'vm'
        })
        .state('checkout.contact', {
            url: "/contact",
            //parent: "checkout",
            templateUrl: "checkout/contact/ContactCheck.html",
            controller: "ContactCheckController",
            controllerAs: 'vm'
        })
        .state('checkout.credit', {
            url: "/credit",
            parent: "checkout",
            templateUrl: "checkout/credit/CreditCheck.html",
            controller: "CreditCheckController",
            controllerAs: 'vm',
            params: {
                "customerInfo": null
            }
        })
        .state('checkout.installation', {
            url: "/installation",
            parent: "checkout",
            templateUrl: "checkout/installation/Installation.html",
            controller: "InstallationController",
            controllerAs: 'vm'
        })
        .state('checkout.tos', {
            url: "/tos",
            parent: "checkout",
            templateUrl: 'checkout/tos/TermsOfService.html',
            controller: 'TermsofServiceController',
            controllerAs: 'vm'
        })
        .state('checkout.deposit', {
            url: "/deposit",
            parent: "checkout",
            templateUrl: 'checkout/deposit/DepositCard.html',
            controller: 'DepositController',
            controllerAs: 'vm'
        })
      .state('confirmation', {
          url: "/confirmation",
          templateUrl: 'bundle/components/order-confirmation/order-confirmation.html',
          controller: 'orderConfirmationController',
          controllerAs: 'vm'
      });
  })
 .run(function ($rootScope, $urlRouter, $timeout, $state, WindowResizeSvc, $window) {
     $rootScope.$on('$locationChangeSuccess', function (a, b) {
         //init vz-rf after template load:
         $timeout(vzrfInit, 0);
     });

     $rootScope.isMobile = function () {
         var screenWidth = $window.innerWidth;
         var isMobile = false;

         if (screenWidth < 650 || angular.element(document.getElementsByTagName('html')).hasClass('device-mobile')) {
             isMobile = true;
         }

         return isMobile;
     }

     $rootScope.isTablet = function () {
         var screenWidth = $window.innerWidth;
         var isTablet = false;

         if (screenWidth > 650 && screenWidth < 969) {
             isTablet = true;
         }

         return isTablet;
     }

     $rootScope.isTablet();

     $rootScope.formatPrice = function (price) {
         return '$' + (price || 0.00).toFixed(2);
     };

     var isSafariCalled = false;
     var safariHeight = null;
     var safariHalfHeight = null;
     var safariSubItemHeight = null;


     $rootScope.isSafari = function () {

         if (isSafariCalled == false) {

             var offsetHeight = document.documentElement.offsetHeight;
             var clientHeight = document.documentElement.clientHeight;

             if (offsetHeight > clientHeight && $rootScope.isMobile()) {
                 safariHeight = ((clientHeight / 2) - 50);
                 safariHalfHeight = (safariHeight / 2) - 20;
                 safariSubItemHeight = safariHalfHeight + 20 + 'px';
                 safariHeight = safariHeight + 'px';
                 safariHalfHeight = safariHalfHeight + 'px';
                 isSafariCalled = true;
             } else {
                 safariHeight = null;
                 safariHalfHeight = null;
                 safariSubItemHeight = null;
                 isSafariCalled = false;
             }
         }

         return {
             safariHeight: safariHeight,
             safariHalfHeight: safariHalfHeight,
             safariSubItemHeight: safariSubItemHeight
         }
     }

     $rootScope.hideScroll = function () {

         return function (context, scope, element) {
             context.$onInit = function () {
                 element.addClass('vzlh-no-scroll');
             }

             scope.$on('$destroy', function () {
                 element.removeClass('vzlh-no-scroll');
             });
         }
     }

     $rootScope.stringifySubOptions = function (data) {
         var optionsString = '';
         var comma = ' ';

         for (var i = 0; i < data.length; ++i) {

             // this below commented code only allows display of 2 premium channels. To check the requirements for this 
             //if (i >= 2) {
             //    break;
             //}

             if (i < data.length - 1) {
                 comma = ', ';
             } else {
                 comma = ' ';
             }

             optionsString = optionsString + data[i].AddonName + comma;
         }

         return optionsString;
     };


 });
