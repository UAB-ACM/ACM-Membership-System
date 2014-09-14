acmApp.controller('memberProfileCtrl', function ($scope, $routeParams, $http, $rootScope, $location) {

    if ($rootScope.key == '' || typeof $rootScope.key == 'undefined') {
        $location.path("/login");
    }

    $('#emailModal').on('shown.bs.modal', function () {
        $('#subject').focus();
    });

    $scope.blazer_id = $routeParams.blazerId;

    $http.get($rootScope.baseURL + '/members/' + $scope.blazer_id, {
        params: {
            'key': $rootScope.key
        }
    }).
    success(function (data, status, headers, config) {
        $scope.member = data;
    });

    $scope.removeMember = function () {
        $http.delete($rootScope.baseURL + '/members/' + $scope.blazer_id, {
            params: {
                'key': $rootScope.key
            }
        });
        $location.path("/members");
    };

    $scope.updateMember = function () {
        $scope.member.key = $rootScope.key;
        $http.put($rootScope.baseURL + '/members/' + $scope.member.blazerid, $scope.member);
    };

    $scope.emailMember = function () {
        $http.post($rootScope.baseURL + '/mail', {
            to: $scope.member.email,
            subject: $('#subject').val(),
            text: $('#text').val(),
            key: $rootScope.key
        }).
        success(function (data, status, headers, config) {
            if (data.error) {
                $("#error").addClass("in").slideDown(2000);
            } else {
                $("#success").addClass("in");
            }
        });
    };

});