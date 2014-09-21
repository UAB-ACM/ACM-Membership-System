acmApp.controller('checkCtrl', function ($scope, $http, $location, $rootScope) {


    $http.get('./config.json')
        .success(function (data, status, headers, config) {
            localStorage.setItem('baseURL', data.server + ':' + data.port);
            localStorage.setItem('logo', data.clubLogo);
            localStorage.setItem('join', data.joinLink);
            $rootScope.logo = localStorage.getItem('logo');
            $rootScope.join = localStorage.getItem('join');

            $http.get(localStorage.getItem('baseURL') + '/members').success(function (data, status, headers, config) {
                members = data.map(function (item) {
                    return item.blazerid
                });
            });
        })
        .error(function (data, status, headers, config) {
            console.log('There was an error connecting to the server');
        });

    $scope.isMember = function () {
        var blazerId = document.getElementById('blazerId').value;

        if (blazerId != "" && members.indexOf(blazerId.toLowerCase()) >= 0) {

            $scope.yes = true;

            $scope.member;

            $http.get(localStorage.getItem('baseURL') + '/members/' + blazerId).
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