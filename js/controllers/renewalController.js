acmApp.controller('renewalCtrl', function ($scope, $http, $rootScope, $location) {

    if ($rootScope.key == '' || typeof $rootScope.key == 'undefined') {
        $location.path("/login");
    }

    $scope.renewal = '';
    var emails;

    $scope.getMembers = function () {
        $http.post($rootScope.baseURL + '/expired', {
            renewal: $scope.renewal,
            key: $rootScope.key
        }).
        success(function (data, status, headers, config) {
            $scope.members = data;
            emails = $scope.members.map(function (member) {
                return member.email;
            });
        });
    };

    $scope.emailMembers = function () {
        $http.post($rootScope.baseURL + '/mail', {
            to: emails,
            subject: $('#subject').val(),
            text: $('#text').val(),
            key: $rootScope.key
        });
    };

    $scope.removeMembers = function () {
        $http.delete($rootScope.baseURL + '/expired', {
            params: {
                'renewal': $scope.renewal,
                'key': $rootScope.key
            }
        });
    };
});