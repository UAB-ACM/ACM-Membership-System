acmApp.controller('membersCtrl', function ($scope, $http, $location, $cookieStore) {

    if ($cookieStore.get('session') == '' || typeof $cookieStore.get('session') == 'undefined') {
        $location.path("/login");
        console.log("damn");
    }

    $http.get($cookieStore.get('baseURL') + '/members').
    success(function (data, status, headers, config) {
        $scope.members = data;

    });
});