angular.module('acmApp.directives')
    .directive('mainMenu', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment         
        templateUrl: 'partials/mainMenu.html',
    }
});
