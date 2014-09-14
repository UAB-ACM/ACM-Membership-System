var acmApp = angular.module('acmApp', ['ngRoute']);

acmApp.config(function ($routeProvider) {
    $routeProvider
        .when('/members', {
            templateUrl: 'partials/members.html',
            controller: 'membersCtrl',
            controllerAs: 'membersCtrl'
        })
        .when('/members/:blazerId', {
            templateUrl: 'partials/member-profile.html',
            controller: 'memberProfileCtrl',
            controllerAs: 'profileCtrl'
        })
        .when('/add-member', {
            templateUrl: 'partials/add-member.html',
            controller: 'newMemberCtrl',
            controllerAs: 'newMemberCtrl'
        })
        .when('/renewals', {
            templateUrl: 'partials/renewals.html',
            controller: 'renewalCtrl',
            controllerAs: 'renewalCtrl'
        })
        .when('/email', {
            templateUrl: 'partials/email.html',
            controller: 'emailCtrl',
            controllerAs: 'emailCtrl'
        })
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginCtrl',
            controllerAs: 'loginCtrl'
        })
        .when('/settings', {
            templateUrl: 'partials/settings.html',
            controller: 'settingsCtrl',
            controllerAs: 'settingsCtrl'
        })
        .when('/am-i-a-member', {
            templateUrl: 'partials/am-i-a-member.html',
            controller: 'checkCtrl',
            controllerAs: 'checkCtrl'
        })
        .otherwise({
            redirectTo: '/login'
        });
});