/**
 * @ngdoc controller
 * @name acmApp.controller:memberProfileController
 * @requires $scope
 * @requires $routeParams
 * @requires $http
 * @requires $location
 * @description
 * This controller is used to control member profile pages
 */
angular.module('acmApp').controller('memberProfileCtrl', function ($scope, $routeParams, $http, $location) {

    if (!localStorage.getItem('session')) {
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

    /**
     * @ngdoc method
     * @name acmApp.controller:memberProfileController#removeMember
     * @methodOf acmApp.controller:memberProfileController
     * @description
     * Removes the current member from the list of members
     */
    $scope.removeMember = function () {
        $http.delete(localStorage.getItem('baseURL') + '/members/' + $scope.blazer_id, {
            params: {
                'key': localStorage.getItem('session')
            }
        });
        $location.path("/members");
    };

    /**
     * @ngdoc method
     * @name acmApp.controller:memberProfileController#updateMember
     * @methodOf acmApp.controller:memberProfileController
     * @description
     * Updates the current members information
     */
    $scope.updateMember = function () {
        $scope.member.key = localStorage.getItem('session');
        $http.put(localStorage.getItem('baseURL') + '/members/' + $scope.member.blazerid, $scope.member);
    };

    /**
     * @ngdoc method
     * @name acmApp.controller:memberProfileController#emailMember
     * @methodOf acmApp.controller:memberProfileController
     * @description
     * Emails the current member
     */
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