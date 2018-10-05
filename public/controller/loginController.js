// var app = angular.module('loginController', []);
chatApp.controller('loginController', function($scope, $http, $location) {
    // if (localStorage.getItem('token') != null) {
    //     $location.path("/dashboard");
    // }
    
    console.log('login');
    // else{
        $scope.user={
        'email': '',
        'password': ''
    }
    // console.log($scope.user);
    // console.log($scope.email);
    $scope.login = function(){
        //  console.log($scope.response);
           try{
                if($scope.email==' '||$scope.password==' '){
                    throw new Error("Enter the username and password to login");
                }
        
              }  
             catch(error){
                alert(error);
                return(error);
              }
        console.log("login calling", $scope.user);  
    $http({
        
        method: 'POST',
        url: '/Login',
        data: $scope.user
    }).then(function(response){
        console.log(response);
        console.log(response.data.error);
    
    
        if(response.data.error==false){
            console.log("successful");
            $scope.message="Login Successful";
            localStorage.setItem('userid',response.data.userid);
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('username',response.data.username);
            // $location.path('/dashboard');
            $location.path('/dashboard');
        }

        else{
            $scope.message="Login Unsuccessful";
        }
        
    });
//    }
 }   
});
