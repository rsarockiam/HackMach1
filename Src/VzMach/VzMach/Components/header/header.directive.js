'use strict';

/**
 * @ngdoc function
 * @name lighthouseApp.directive:vzNotification
 * @description
 * # vzNotification
 * Directive of the lighthouseApp
 */

angular.module('vzMach')
.directive('vzHeader', ['$rootScope', function($rootScope, NotificationSvc) {
  return {
    restrict: 'E',
    controller: 'HeaderCtrl',
    templateUrl: 'components/header/header.html'
  };
}]);
