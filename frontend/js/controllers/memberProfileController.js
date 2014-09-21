acmApp.controller('memberProfileCtrl', function ($scope, $routeParams, $http, $location) {

    if (localStorage.getItem('session') == '' || typeof localStorage.getItem('session') == 'undefined') {
        $location.path("/login");
    }

    $('#emailModal').on('shown.bs.modal', function () {
        $('#subject').focus();
    });

    $scope.blazer_id = $routeParams.blazerId;

    $http.get(localStorage.getItem('baseURL') + '/members/' + $scope.blazer_id, {
        params: {
            'key': localStorage.getItem('session')
        }
    }).
    success(function (data, status, headers, config) {
        $scope.member = data;
    });

    $scope.removeMember = function () {
        $http.delete(localStorage.getItem('baseURL') + '/members/' + $scope.blazer_id, {
            params: {
                'key': localStorage.getItem('session')
            }
        });
        $location.path("/members");
    };

    $scope.updateMember = function () {
        $scope.member.key = localStorage.getItem('session');
        $http.put(localStorage.getItem('baseURL') + '/members/' + $scope.member.blazerid, $scope.member);
    };

    $scope.emailMember = function () {
        $http.post(localStorage.getItem('baseURL') + '/mail', {
            to: $scope.member.email,
            subject: $('#subject').val(),
            text: $('#text').val(),
            key: localStorage.getItem('session')
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