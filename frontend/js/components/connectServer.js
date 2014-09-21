$http.get('./config.json').
success(function (data, status, headers, config) {
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
}).
error(function (data, status, headers, config) {
    console.log('There was an error connecting to the server');
});