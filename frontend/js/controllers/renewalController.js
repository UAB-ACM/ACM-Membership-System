acmApp.controller('renewalCtrl', function ($scope, $http, $location) {

    if (localStorage.getItem('session') == '' || typeof localStorage.getItem('session') == 'undefined') {
        $location.path("/login");
    }

    $scope.renewal = '';
    var emails;

    $scope.getMembers = function () {
        $http.post(localStorage.getItem('baseURL') + '/expired', {
            renewal: $scope.renewal,
            key: localStorage.getItem('session')
        }).
        success(function (data, status, headers, config) {
            $scope.members = data;
            emails = $scope.members.map(function (member) {
                return member.email;
            });
        });
    };

    $scope.emailMembers = function () {
        $http.post(localStorage.getItem('baseURL') + '/mail', {
            to: emails,
            subject: $('#subject').val(),
            text: $('#text').val(),
            key: localStorage.getItem('session')
        });
    };

    $scope.removeMembers = function () {
        $http.delete(localStorage.getItem('baseURL') + '/expired', {
            params: {
                'renewal': $scope.renewal,
                'key': localStorage.getItem('session')
            }
        });
    };
});