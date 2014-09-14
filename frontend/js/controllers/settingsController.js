acmApp.controller('settingsCtrl', function ($scope, $http, $rootScope, $location) {

    if ($rootScope.key == '' || typeof $rootScope.key == 'undefined') {
        $location.path("/login");
    }

    $scope.changePassword = function () {
        if ($scope.new == $scope.confirm) {
            $http.post($rootScope.baseURL + '/change', {
                'old': $scope.old,
                'new': $scope.new,
                'key': $rootScope.key
            });
        }
    };
});