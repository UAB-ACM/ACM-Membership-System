acmApp.controller('membersCtrl', function ($scope, $http, $rootScope, $location) {

    if ($rootScope.key == '' || typeof $rootScope.key == 'undefined') {
        $location.path("/login");
    }

    $http.get($rootScope.baseURL + '/members').
    success(function (data, status, headers, config) {
        $scope.members = data;

    });
});