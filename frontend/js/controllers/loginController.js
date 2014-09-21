acmApp.controller('loginCtrl', function ($scope, $http, $location, $rootScope) {


    $http.get('./config.json').
    success(function (data, status, headers, config) {
        localStorage.setItem('baseURL', data.server + ':' + data.port);
        localStorage.setItem('logo', data.clubLogo);
        $rootScope.logo = localStorage.getItem('logo');
    }).
    error(function (data, status, headers, config) {
        console.log('There was an error connecting to the server');
    });

    $scope.login = function () {
        $http.post(localStorage.getItem('baseURL') + '/login', {
            password: $('#password').val()
        }).
        success(function (data, status, headers, config) {

            if (data.error) {
                $scope.error = data.error;
                $("#loginContainer").addClass("has-error");
                shakeForm();
            } else if (data != '' && typeof data != 'undefined') {
                localStorage.setItem('session', data);
                $location.path("/members");
            }
        }).
        error(function (data, status, headers, config) {

            $scope.error = data.error;
            $scope.failed = true;
        });
    };

    function shakeForm() {
        var len = 20;
        for (var i = 0; i < 6; i++)
            $("#password").animate({
                'margin-left': "+=" + (len = -len) + 'px'
            }, 75);
    }

    $('#password').keypress(function (e) {
        if (e.which == 13) {
            $scope.login();
        }
    });
});