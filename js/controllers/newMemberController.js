acmApp.controller('newMemberCtrl', function ($scope, $http, $rootScope, $location) {

    if ($rootScope.key == '' || typeof $rootScope.key == 'undefined') {
        $location.path("/login");
    }

    $scope.addMember = function () {

        $scope.member.key = $rootScope.key;
        $http.post($rootScope.baseURL + '/members', $scope.member);
        $location.path("/members");
    };
});