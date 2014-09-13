(function () {
    var acmApp = angular.module('acmApp', ['ngRoute']);

    acmApp.config(function ($routeProvider) {
        $routeProvider
            .when('/members', {
                templateUrl: 'views/members.html',
                controller: 'membersCtrl',
                controllerAs: 'membersCtrl'
            })
            .when('/members/:blazerId', {
                templateUrl: 'views/member-profile.html',
                controller: 'memberProfileCtrl',
                controllerAs: 'profileCtrl'
            })
            .when('/add-member', {
                templateUrl: 'views/add-member.html',
                controller: 'newMemberCtrl',
                controllerAs: 'newMemberCtrl'
            })
            .when('/renewals', {
                templateUrl: 'views/renewals.html',
                controller: 'renewalCtrl',
                controllerAs: 'renewalCtrl'
            })
            .when('/email', {
                templateUrl: 'views/email.html',
                controller: 'emailCtrl',
                controllerAs: 'emailCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'loginCtrl',
                controllerAs: 'loginCtrl'
            })
            .when('/settings', {
                templateUrl: 'views/settings.html',
                controller: 'settingsCtrl',
                controllerAs: 'settingsCtrl'
            })
            .when('/am-i-a-member', {
                templateUrl: 'views/am-i-a-member.html',
                controller: 'checkCtrl',
                controllerAs: 'checkCtrl'
            })
            .otherwise({
                redirectTo: '/login'
            });
    });

    acmApp.controller('loginCtrl', function ($scope, $http, $rootScope, $location) {

        $scope.login = function () {
            $http.post('http://bradengroom.com:3000/login', {
                password: $('#password').val()
            }).
            success(function (data, status, headers, config) {

                if (data.error) {
                    $scope.error = data.error;
                    $("#loginContainer").addClass("has-error");
                    shakeForm();
                } else if (data != '' && typeof data != 'undefined') {
                    $rootScope.key = data;
                    $location.path("/members");
                }
            }).
            error(function (data, status, headers, config) {

                $scope.error = data.error;
                $scope.failed = true;
            });
        };

        function shakeForm() {
            var len = 20;
            for (var i = 0; i < 6; i++)
                $("#password").animate({
                    'margin-left': "+=" + (len = -len) + 'px'
                }, 75);
        }
    });

    acmApp.controller('settingsCtrl', function ($scope, $http, $rootScope, $location) {

        if ($rootScope.key == '' || typeof $rootScope.key == 'undefined') {
            $location.path("/login");
        }

        $scope.changePassword = function () {
            if ($scope.new == $scope.confirm) {
                $http.post('http://bradengroom.com:3000/change', {
                    'old': $scope.old,
                    'new': $scope.new,
                    'key': $rootScope.key
                });
            }
        };
    });

    acmApp.controller('checkCtrl', function ($scope, $http, $rootScope, $location) {

        var members;

        $http.get('http://bradengroom.com:3000/members').
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

                $http.get('http://bradengroom.com:3000/members/' + blazerId).
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

    acmApp.controller('membersCtrl', function ($scope, $http, $rootScope, $location) {

        if ($rootScope.key == '' || typeof $rootScope.key == 'undefined') {
            $location.path("/login");
        }

        $http.get('http://bradengroom.com:3000/members').
        success(function (data, status, headers, config) {
            $scope.members = data;

        });
    });

    acmApp.controller('renewalCtrl', function ($scope, $http, $rootScope, $location) {

        if ($rootScope.key == '' || typeof $rootScope.key == 'undefined') {
            $location.path("/login");
        }

        $scope.renewal = '';
        var emails;

        $scope.getMembers = function () {
            $http.post('http://bradengroom.com:3000/expired', {
                renewal: $scope.renewal,
                key: $rootScope.key
            }).
            success(function (data, status, headers, config) {
                $scope.members = data;
                emails = $scope.members.map(function (member) {
                    return member.email;
                });
            });
        };

        $scope.emailMembers = function () {
            $http.post('http://bradengroom.com:3000/mail', {
                to: emails,
                subject: $('#subject').val(),
                text: $('#text').val(),
                key: $rootScope.key
            });
        };

        $scope.removeMembers = function () {
            $http.delete('http://bradengroom.com:3000/expired', {
                params: {
                    'renewal': $scope.renewal,
                    'key': $rootScope.key
                }
            });
            console.log('called');
        };
    });

    acmApp.controller('memberProfileCtrl', function ($scope, $routeParams, $http, $rootScope, $location) {

        if ($rootScope.key == '' || typeof $rootScope.key == 'undefined') {
            $location.path("/login");
        }

        $('#emailModal').on('shown.bs.modal', function () {
            $('#subject').focus();
        });

        $scope.blazer_id = $routeParams.blazerId;

        $http.get('http://bradengroom.com:3000/members/' + $scope.blazer_id, {
            params: {
                'key': $rootScope.key
            }
        }).
        success(function (data, status, headers, config) {
            console.log(data)
            $scope.member = data;
        });

        $scope.removeMember = function () {
            $http.delete('http://bradengroom.com:3000/members/' + $scope.blazer_id, {
                params: {
                    'key': $rootScope.key
                }
            });
            $location.path("/members");
        };

        $scope.updateMember = function () {
            $scope.member.key = $rootScope.key;
            $http.put('http://bradengroom.com:3000/members/' + $scope.member.blazerid, $scope.member);
        };

        $scope.emailMember = function () {
            $http.post('http://bradengroom.com:3000/mail', {
                to: $scope.member.email,
                subject: $('#subject').val(),
                text: $('#text').val(),
                key: $rootScope.key
            });
        };

    });

    acmApp.controller('emailCtrl', function ($scope, $routeParams, $http, $rootScope, $location) {

        if ($rootScope.key == '' || typeof $rootScope.key == 'undefined') {
            $location.path("/login");
        }

        $scope.emailMembers = function () {
            $http.post('http://bradengroom.com:3000/mail/all', {
                subject: $('#subject').val(),
                text: $('#text').val(),
                key: $rootScope.key
            });
        };

    });

    acmApp.controller('newMemberCtrl', function ($scope, $http, $rootScope, $location) {

        if ($rootScope.key == '' || typeof $rootScope.key == 'undefined') {
            $location.path("/login");
        }

        $scope.addMember = function () {

            $scope.member.key = $rootScope.key;
            $http.post('http://bradengroom.com:3000/members', $scope.member);
            $location.path("/members");
        };
    });

})();