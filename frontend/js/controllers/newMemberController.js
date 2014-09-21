/**
 * @ngdoc controller
 * @name acmApp.controller:newMemberController
 * @requires $scope
 * @requires $http
 * @requires $location
 * @description
 * This controller is used to control the new member form
 */
acmApp.controller('newMemberCtrl', function ($scope, $http, $location) {

    if (localStorage.getItem('session') == '' || typeof localStorage.getItem('session') == 'undefined') {
        $location.path("/login");
    }

    
    /**
     * @ngdoc method
     * @name acmApp.controller:newMemberController#addMember
     * @methodOf acmApp.controller:newMemberController
     * @description
     * Adds a new member to the members list using the information provided in the new member form
     */
    $scope.addMember = function () {

        $scope.member.key = localStorage.getItem('session');
        $http.post(localStorage.getItem('baseURL') + '/members', $scope.member);
        $location.path("/members");
    };
});