acmApp.controller('renewalCtrl', function ($scope, $http, $location, $cookieStore) {

    if ($cookieStore.get('session') == '' || typeof $cookieStore.get('session') == 'undefined') {
        $location.path("/login");
    }

    $scope.renewal = '';
    var emails;

    $scope.getMembers = function () {
        $http.post($cookieStore.get('baseURL') + '/expired', {
            renewal: $scope.renewal,
            key: $cookieStore.get('session')
        }).
        success(function (data, status, headers, config) {
            $scope.members = data;
            emails = $scope.members.map(function (member) {
                return member.email;
            });
        });
    };

    $scope.emailMembers = function () {
        $http.post($cookieStore.get('baseURL') + '/mail', {
            to: emails,
            subject: $('#subject').val(),
            text: $('#text').val(),
            key: $cookieStore.get('session')
        });
    };

    $scope.removeMembers = function () {
        $http.delete($cookieStore.get('baseURL') + '/expired', {
            params: {
                'renewal': $scope.renewal,
                'key': $cookieStore.get('session')
            }
        });
    };
});