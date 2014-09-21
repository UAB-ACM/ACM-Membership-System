/**
 * @ngdoc object
 * @name acmApp
 * @requires ngRoute
 * @description
 * The acmApp is the app which controls everything...
 */
var acmApp = angular.module('acmApp', ['ngRoute']);

acmApp.config(function ($routeProvider) {
    $routeProvider
        .when('/members', {
            templateUrl: 'partials/members.html',
            controller: 'membersCtrl',
        })
        .when('/members/:blazerId', {
            templateUrl: 'partials/member-profile.html',
            controller: 'memberProfileCtrl',
            controllerAs: 'profileCtrl'
        })
        .when('/add-member', {
            templateUrl: 'partials/add-member.html',
            controller: 'newMemberCtrl',
        })
        .when('/renewals', {
            templateUrl: 'partials/renewals.html',
            controller: 'renewalCtrl',
        })
        .when('/email', {
            templateUrl: 'partials/email.html',
            controller: 'emailCtrl',
        })
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginCtrl',
        })
        .when('/settings', {
            templateUrl: 'partials/settings.html',
            controller: 'settingsCtrl',
        })
        .when('/am-i-a-member', {
            templateUrl: 'partials/am-i-a-member.html',
            controller: 'checkCtrl',
        })
        .otherwise({
            redirectTo: '/login'
        });
});