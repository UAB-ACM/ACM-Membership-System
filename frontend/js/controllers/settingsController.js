acmApp.controller('settingsCtrl', function ($scope, $http, $location, $cookieStore) {

    if ($cookieStore.get('session') == '' || typeof $cookieStore.get('session') == 'undefined') {
        $location.path("/login");
    }

    $scope.changePassword = function () {
        if ($scope.new == $scope.confirm) {
            $http.post($cookieStore.get('baseURL') + '/change', {
                'old': $scope.old,
                'new': $scope.new,
                'key': $cookieStore.get('session')
            });
        }
    };
});