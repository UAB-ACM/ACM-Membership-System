acmApp.controller('loginCtrl', function ($scope, $http, $rootScope, $location) {


    if (typeof $rootScope.baseURL == 'undefined' || typeof $rootScope.logo == 'undefined')
    $http.get('./config.json').
    success(function (data, status, headers, config) {
        $rootScope.baseURL = data.server + ':' + data.port;
        $rootScope.logo = data.clubLogo;
    }).
    error(function (data, status, headers, config) {
        console.log('There was an error connecting to the server');
    });

    
    $scope.login = function () {
        $http.post($rootScope.baseURL + '/login', {
            password: $('#password').val()
        }).
        success(function (data, status, headers, config) {

            if (data.error) {
                $scope.error = data.error;
                $("#loginContainer").addClass("has-error");
                shakeForm();
            } else if (data != '' && typeof data != 'undefined') {
                $rootScope.key = data;
                //use this eventually
                //localStorage.setItem('session', data);
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
});