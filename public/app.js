var chatApp = angular.module('chatApp', ['ngRoute','btford.socket-io']);
chatApp.config(function($routeProvider) {
    $routeProvider

        // route for the signup  page
        .when('/', {
            templateUrl : 'views/Regestration.html',
            controller  : 'signupController'
        })

        // route for the login page
        .when('/Login', {
            templateUrl : 'views/Login.html',
            controller  : 'loginController'
        })
        //route for chat dashboard
        .when('/dashboard', {
            templateUrl : 'views/dashboard.html',
            controller : 'dashController'
        });
             
});
chatApp.service('SocketService',['socketFactory', function SocketService(socketFactory){
    return socketFactory({
        ioSocket: io.connect('http://localhost:3040')
    });
}]); 