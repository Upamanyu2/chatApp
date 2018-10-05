chatApp.controller('dashController',function($scope, $http, $location, SocketService){
   var userid=localStorage.getItem('userid');
   var token=localStorage.getItem('token');
   var username=localStorage.getItem('username');
   var list=[];
   var chatList=[];
   $http({
       method: 'GET',
       url: '/auth/users/'+userid+'/list',
       headers: {
        'token': token,
      },
   }).then(function(response, error){
       console.log(response);
       console.log(response.data.message[0]);
    //    for(var i=0; i<response.data.message.length; i++){
    //      list.push(response.data.message[i].name);
    // }
    console.log(list);
    $scope.list=response.data.message;
    console.log("Aunthenticated successsfully");
    },function(error){
        console.log("Error in fetching data")        
});
// $scope.chatList = [];
$scope.add = function(){
    if($scope.message.length!==0){
        SocketService.emit('chatRoomBackend',{'userid':userid,'username':username,'message':$scope.message,'Time':new Date()})
    }
}
var chatList=[]
   $http({
       method: 'GET',
       url:'/auth/users/chatList',
       headers: {
           'token':token
       }
   }).then (function(response){
       console.log(response.data.message);
       for(var i =0;i<response.data.message.length;i++){
           chatList.push(response.data.message[i])
       }
       $scope.chatList = chatList;
   })
       console.log(username);
       $scope.curruser=username;
   SocketService.on('chatroomClient', function(msg){
       console.log(msg);
       var mydata={Userid:msg.userid,Name:msg.username,Message:msg.message,Time:msg.Time}
       $scope.chatList.push(mydata);
   })
   $scope.logout = function(){
       localStorage.removeItem('userid');
       localStorage.removeItem('token');
       localStorage.removeItem('username');
       $location.path('/Login');
   }
  $scope.chatRoom = function(userdata){
      console.log(userdata);
      var chat_array_person = [];
      var send_username = userdata.name;
      console.log("username-->",username);
      console.log("send username-->",send_username);
      if(send_username){
        $scope.group_display=true;
        $scope.person_display=false; 
      }
      $http({
          method : 'GET',
          url    :'/auth/users/peerToPeerChatList',
          headers:
      {
         'token': token,
         'Send_username':send_username//passing local storage user id to the headers
      }
   }).then(function(response){
       console.log(response.data);
       if(response.data.length>0){
           for(var i=0;i<response.data.length;i++){
            if((response.data[i].username==send_username && response.data[i].send_username==username)||(response.data[i].username==username && response.data[i].send_username==send_username))
            chat_array_person.push(response.data[i])
           }
           $scope.chat_array_person=chat_array_person;
        }  
   });
 }
   $scope.peerToPeer = function(){
       if($scope.message1==''||$scope.message1==' '||$scope.message1==null){
           alert("Please enter some message");
       }
       else{
           if($scope.message1.length!=0){
            SocketService.emit('chatBackend',{"Username":username,"Send_username":$scope.Send_username,
            "Message":$scope.message1,"Time":new Date() });
            // $scope.message='';
           }
           SocketService.on('toFrontendUser', function(data){
               console.log(data);
            //    $scope.chat_array_person.push(data);
            //    chat_array_person =[]; 
           });
       }
   }
});
