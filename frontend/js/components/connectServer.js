$http.get('./config.json').
    success(function (data, status, headers, config) {
        localStorage.setItem('baseURL', data.server + ':' + data.port);
        localStorage.setItem('logo', data.clubLogo);
        $rootScope.logo = localStorage.getItem('logo');
    }).
    error(function (data, status, headers, config) {
        console.log('There was an error connecting to the server');
    });