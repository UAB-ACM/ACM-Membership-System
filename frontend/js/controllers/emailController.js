acmApp.controller('emailCtrl', function ($scope, $routeParams, $http, $rootScope, $location) {

    if ($rootScope.key == '' || typeof $rootScope.key == 'undefined') {
        $location.path("/login");
    }

    $scope.emailMembers = function () {
        $http.post($rootScope.baseURL + '/mail/all', {
            subject: $('#subject').val(),
            text: $('#text').val(),
            key: $rootScope.key
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