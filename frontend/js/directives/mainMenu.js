angular.module('acmApp.directives')
    .directive('mainMenu', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment         
        templateUrl: 'partials/mainMenu.html',
        //controller: controllerFunction, //Embed a custom controller in the directive
        //link: function ($scope, element, attrs) { } //DOM manipulation
    }
});
