acmApp.controller('emailCtrl', function ($scope, $routeParams, $http, $location, $cookieStore) {

    if ($cookieStore.get('session') == '' || typeof $cookieStore.get('session') == 'undefined') {
        $location.path("/login");
    }

    $scope.emailMembers = function () {
        $http.post($cookieStore.get('baseURL') + '/mail/all', {
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