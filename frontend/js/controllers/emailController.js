acmApp.controller('emailCtrl', function ($scope, $routeParams, $http, $location) {

    if (localStorage.getItem('session') == '' || typeof localStorage.getItem('session') == 'undefined') {
        $location.path("/login");
    }

    $scope.emailMembers = function () {
        $http.post(localStorage.getItem('baseURL') + '/mail/all', {
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