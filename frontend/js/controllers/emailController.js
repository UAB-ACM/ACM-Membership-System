/**
 * @ngdoc controller
 * @name acmApp.controller:emailController
 * @requires $scope
 * @requires $http
 * @requires $location
 * @description
 * This controller is used email all users.
 */
angular.module('acmApp').controller('emailCtrl', function ($scope, $http, $location) {

    if (!localStorage.getItem('session')) {
        $location.path("/login");
    }


    /**
     * @ngdoc method
     * @name acmApp.controller:emailController#emailMembers
     * @methodOf acmApp.controller:emailController
     * @description
     * This function reads in the subject and body from the email modal and sends the email to all members
     */
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