acmApp.controller('newMemberCtrl', function ($scope, $http, $location, $cookieStore) {

    if ($cookieStore.get('session') == '' || typeof $cookieStore.get('session') == 'undefined') {
        $location.path("/login");
    }

    $scope.addMember = function () {

        $scope.member.key = $cookieStore.get('session');
        $http.post($cookieStore.get('baseURL') + '/members', $scope.member);
        $location.path("/members");
    };
});