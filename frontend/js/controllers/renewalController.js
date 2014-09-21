/**
 * @ngdoc controller
 * @name acmApp.controller:renewalController
 * @requires $scope
 * @requires $http
 * @requires $location
 * @description
 * This controller is used to control the member renewals page
 */
acmApp.controller('renewalCtrl', function ($scope, $http, $location) {

    if (localStorage.getItem('session') == '' || typeof localStorage.getItem('session') == 'undefined') {
        $location.path("/login");
    }

    $scope.renewal = '';
    var emails;

    /**
     * @ngdoc method
     * @name acmApp.controller:renewalController#getMembers
     * @methodOf acmApp.controller:renewalController
     * @description
     * Retreives a list of members matching the renewal time entered in the renewal search field
     */
    $scope.getMembers = function () {
        $http.post(localStorage.getItem('baseURL') + '/expired', {
            renewal: $scope.renewal,
            key: localStorage.getItem('session')
        }).
        success(function (data, status, headers, config) {
            $scope.members = data;
            emails = $scope.members.map(function (member) {
                return member.email;
            });
        });
    };

    /**
     * @ngdoc method
     * @name acmApp.controller:renewalController#emailMembers
     * @methodOf acmApp.controller:renewalController
     * @description
     * Emails all members matching the given renewal time
     */
    $scope.emailMembers = function () {
        $http.post(localStorage.getItem('baseURL') + '/mail', {
            to: emails,
            subject: $('#subject').val(),
            text: $('#text').val(),
            key: localStorage.getItem('session')
        });
    };

    /**
     * @ngdoc method
     * @name acmApp.controller:renewalController#removeMembers
     * @methodOf acmApp.controller:renewalController
     * @description
     * Removes all members matching the given renewal time
     */
    $scope.removeMembers = function () {
        $http.delete(localStorage.getItem('baseURL') + '/expired', {
            params: {
                'renewal': $scope.renewal,
                'key': localStorage.getItem('session')
            }
        });
    };
});