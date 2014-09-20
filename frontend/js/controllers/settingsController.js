acmApp.controller('settingsCtrl', function ($scope, $http, $location) {

    if (localStorage.getItem('session') == '' || typeof localStorage.getItem('session') == 'undefined') {
        $location.path("/login");
    }

    $scope.changePassword = function () {
        if ($scope.new == $scope.confirm) {
            $http.post(localStorage.getItem('baseURL') + '/change', {
                'old': $scope.old,
                'new': $scope.new,
                'key': localStorage.getItem('session')
            });
        }
    };
});