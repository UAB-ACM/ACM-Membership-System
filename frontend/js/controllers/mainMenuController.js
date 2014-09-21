/**
 * @ngdoc controller
 * @name acmApp.controller:mainMenuController
 * @requires $scope
 * @requires $location
 * @description
 * This controller is used to control the main menu.
 */
angular.module('acmApp').controller('mainMenuCtrl', function ($scope, $location) {

    /**
     * @ngdoc method
     * @name acmApp.controller:mainMenuController#pathCheck
     * @methodOf acmApp.controller:mainMenuController
     * @description
     * This function checks the path to see if the members page is being viewed
     */
    $scope.pathCheck = function () {
        return $location.path() == '/members';
    };

});