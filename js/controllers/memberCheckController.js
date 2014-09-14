acmApp.controller('checkCtrl', function ($scope, $http, $rootScope, $location) {

    if (typeof $rootScope.baseURL == 'undefined' || typeof $rootScope.logo == 'undefined' || typeof $rootScope.join == 'undefined') {
        $http.get('./config.json')
            .success(function (data, status, headers, config) {
                $rootScope.baseURL = data.server + ':' + data.port;
                $rootScope.logo = data.clubLogo;
                $rootScope.join = data.joinLink;

                $http.get($rootScope.baseURL + '/members').success(function (data, status, headers, config) {
                    members = data.map(function (item) {
                        return item.blazerid
                    });
                });
            })
            .error(function (data, status, headers, config) {
                console.log('There was an error connecting to the server');
            });
    }

    $scope.isMember = function () {
        var blazerId = document.getElementById('blazerId').value;

        if (blazerId != "" && members.indexOf(blazerId.toLowerCase()) >= 0) {

            $scope.yes = true;

            $scope.member;

            $http.get($rootScope.baseURL + '/members/' + blazerId).
            success(function (data, status, headers, config) {
                $scope.member = data;
            });

        } else {
            $scope.yes = false;
        }
        $scope.$apply();
    };

    $(document).ready(function () {
        var input = document.getElementById("blazerId");
        input.addEventListener("keyup", function (e) {
            $scope.isMember();
            $scope.hasinput = true;
        });
    });
});