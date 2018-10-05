var express     =   require("express");
var app         =   express();
var socket      =   require('socket.io');
var bodyParser  =   require("body-parser");
var users       =   require("./api/Controller/userController.js")
//var mongoOp     =   require("../chatappapi/model/user.js");
//var mongoose    =   require('mongoose');
//var router      =   express.Router();
var server = require('http').createServer(app);
var io = socket(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false})); 
var router = require('./api/route.js');
app.use('/', router);
app.use(express.static('./public'));
server.listen(3040);
console.log("Listening to PORT 3040");
io.on('connection',function(client){
    console.log("system working");
    client.on('chatRoomBackend',function(data){
        console.log("user connected");
        // console.log(data);
        users.chatAddHistory(data.userid,data.username,data.message,data.Time);
        io.emit('chatroomClient',data);  
    });
    client.on('chatBackEnd',function(data){
        console.log("Entered the room"); 
        users.peerToPeerChat(data.Username,data.Send_username,data.Message,data.Time);
        io.emit('toFrontendUser',data);
    });
});
