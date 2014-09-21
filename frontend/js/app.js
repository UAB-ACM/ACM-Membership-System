
/**
 * @ngdoc object
 * @name acmApp
 * @requires ngRoute
 * @description
 * The acmApp is the app which controls everything...
 */
angular.module('acmApp.controllers', ['ui.gravatar']);
angular.module('acmApp.directives', []);
angular.module('acmApp', ['ngRoute','ui.gravatar','acmApp.controllers','acmApp.directives']);
