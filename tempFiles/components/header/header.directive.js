'use strict';

/**
 * @ngdoc function
 * @name lighthouseApp.directive:vzNotification
 * @description
 * # vzNotification
 * Directive of the lighthouseApp
 */

angular.module('lighthouseApp')
.directive('vzHeader', ['$rootScope', function($rootScope, NotificationSvc) {
  return {
    restrict: 'E',
    controller: 'HeaderCtrl',
    templateUrl: 'bundle/components/header/header.html'
  };
}]);
