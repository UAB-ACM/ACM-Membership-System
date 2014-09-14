acmApp.controller('emailCtrl', function ($scope, $routeParams, $http, $rootScope, $location) {

    if ($rootScope.key == '' || typeof $rootScope.key == 'undefined') {
        $location.path("/login");
    }

    $scope.emailMembers = function () {
        $http.post($rootScope.baseURL + '/mail/all', {
            subject: $('#subject').val(),
            text: $('#text').val(),
            key: $rootScope.key
        });
    };

});