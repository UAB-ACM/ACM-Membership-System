angular.module('acmApp.directives')
    .directive('mainMenu', ['$location', function ($location) {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment         
        templateUrl: 'partials/mainMenu.html',
    }
}]);
