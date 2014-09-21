/**
 * @ngdoc controller
 * @name acmApp.controller:settingsController
 * @requires $scope
 * @requires $http
 * @requires $location
 * @description
 * This controller is used to control settings page
 */
angular.module('acmApp').controller('settingsCtrl', function ($scope, $http, $location) {

    if (!localStorage.getItem('session')) {
        $location.path("/login");
    }

    /**
     * @ngdoc method
     * @name acmApp.controller:settingsController#changePassword
     * @methodOf acmApp.controller:settingsController
     * @description
     * Changes the password of admin account
     */
    $scope.changePassword = function () {
        if ($scope.new == $scope.confirm) {
            $http.post(localStorage.getItem('baseURL') + '/change', {
                'old': $scope.old,
                'new': $scope.new,
                'key': localStorage.getItem('session')
            });
        }
    };
});