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
  .module('vzMach', [
    //'ngAnimate',
    'ngAria',
    //'ngCookies',
    //'ngResource',
    //'ngSanitize',
    //'ngTouch',
    //'pascalprecht.translate',
    'ui.router',
    //'environment',
    //'bc.Flickity',
    //'duScroll',
    //'Services',
    //'Constants',
    //'Shared',
    'ui.bootstrap',    
    'ngStorage'
    
  ])
  .provider('globalInitializers', function globalInitializersProvider() {
      this.$get = function () {
          return {
              initialize: function () {
                  var initInjector = angular.injector(["ng"]);
                  var $http = initInjector.get("$http");
                  TCLive = false;
                  MobileFlow = false;
                  MobileFlow = true;

              }
          }
      }
  })
  .config(function (globalInitializersProvider, $stateProvider, $urlRouterProvider) {
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
            templateUrl: "components/landing/landing.html",
            controller: "landingController",
            controllerAs: "vm"
        })
        .state('recommended', {
            url: "/customize",
            templateUrl: "components/recommended/recommended.html",
            controller: "recommendedController",
            controllerAs: 'vm'
        })
           .state('plans', {
               url: "/plans",
               templateUrl: "components/recommended/recommended.html",
               controller: "recommendedController"
           })
        .state('byo', {
            url: "/byo",
            templateUrl: 'components/byob/byob.html',
            params: {
                serviceType: null,
            },
            controller: 'byobController',
            controllerAs: 'vm'
        })
      .state('recommendedPlan', {
          url: "/selected",
          templateUrl: 'components/recommended/recommendedPlan.html',
          controller: 'recommendedPlanController',
          controllerAs: 'vm'
      });


  })

