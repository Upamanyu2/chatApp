// var app = angular.module('registerController', []);
chatApp.controller('signupController', function($scope,$http,$location) {
    console.log('regestration');
    $scope.user={
        'full_name': '',
        'mobile_no': '',
        'email': '',
        'password': ''
    }
    console.log($scope.user);
    $scope.register = function(){
        console.log("register calling", $scope.user);
        // try{
        //     if(full_name == null || full_name == '' || mobile_no == null || mobile_no == '' || email == null || email == '' || password == null || password == ''){
        //         throw new Error("Fields left empty");
        //     }
            
        // }
        // catch(e){
        //     var S = ""+e;
        //     if(e instanceof ReferenceError || e instanceof TypeError || e instanceof SyntaxError
        //         || e instanceof RangeError)
        //     alert(e);
        //     else
        //     alert(S);
        // }
    $http({
        method: 'POST',
        url: '/register',
        data: $scope.user
    }).then(function(response){
        console.log(response);
        console.log(response.data.error);
        
        if(response.data.error==false){
            console.log("successful");
            $scope.message="Regestration successful";
            $location.path('/Login');

        }
        else {
            $scope.message="Regestration unsuccessful";
        }
    });
    }
});