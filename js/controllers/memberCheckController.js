acmApp.controller('checkCtrl', function ($scope, $http, $rootScope, $location) {

    var members;

    $http.get($rootScope.baseURL + '/members').
    success(function (data, status, headers, config) {
        members = data.map(function (item) {
            return item.blazerid
        });
    });

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
            //if (e.keyCode === 13) {
            $scope.isMember();
            $scope.hasinput = true;
            //}
        });
    });
});
