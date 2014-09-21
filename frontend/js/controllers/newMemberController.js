acmApp.controller('newMemberCtrl', function ($scope, $http, $location) {

    if (localStorage.getItem('session') == '' || typeof localStorage.getItem('session') == 'undefined') {
        $location.path("/login");
    }

    $scope.addMember = function () {

        $scope.member.key = localStorage.getItem('session');
        $http.post(localStorage.getItem('baseURL') + '/members', $scope.member);
        $location.path("/members");
    };
});