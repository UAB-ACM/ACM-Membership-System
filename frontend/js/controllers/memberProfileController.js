acmApp.controller('memberProfileCtrl', function ($scope, $routeParams, $http, $location, $cookieStore) {

    if ($cookieStore.get('session') == '' || typeof $cookieStore.get('session') == 'undefined') {
        $location.path("/login");
    }

    $('#emailModal').on('shown.bs.modal', function () {
        $('#subject').focus();
    });

    $scope.blazer_id = $routeParams.blazerId;

    $http.get($cookieStore.get('baseURL') + '/members/' + $scope.blazer_id, {
        params: {
            'key': $cookieStore.get('session')
        }
    }).
    success(function (data, status, headers, config) {
        $scope.member = data;
    });

    $scope.removeMember = function () {
        $http.delete($cookieStore.get('baseURL') + '/members/' + $scope.blazer_id, {
            params: {
                'key': $cookieStore.get('session')
            }
        });
        $location.path("/members");
    };

    $scope.updateMember = function () {
        $scope.member.key = $cookieStore.get('session');
        $http.put($cookieStore.get('baseURL') + '/members/' + $scope.member.blazerid, $scope.member);
    };

    $scope.emailMember = function () {
        $http.post($cookieStore.get('baseURL') + '/mail', {
            to: $scope.member.email,
            subject: $('#subject').val(),
            text: $('#text').val(),
            key: $cookieStore.get('session')
        }).
        success(function (data, status, headers, config) {
            if (data.error) {
                $("#error").slideDown(1000).addClass("in").delay(5000).slideUp(5000);
            } else {
                $("#success").slideDown(1000).addClass("in").delay(5000).slideUp(5000);
            }
        });
    };

});