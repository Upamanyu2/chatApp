// const { check, validationResult } = require('express-validator/check');
var userMongo = require('../../model/user.js');
var chatMongo = require('../../model/chat.js');
var peerToPeerChatMongo = require('../../model/peerToPeer.js')
var jwt = require("jsonwebtoken");

function encrypt(pass) {
    var encryPass = require('crypto')
                   .createHash('sha1')
                   .update(pass)       // Hash the password using SHA1 algorithm.
                   .digest('base64');
                return encryPass;
}
 
//for registration purpose
exports.registration = function (req, res) {
 try{
    var mail = req.body.email;
    // check(mail).isEmail();
    // check(req.body.password).isLength({min:5, max:15});
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(422).json({ errors: errors.array() });
    //   }
    var db = new userMongo();
    var p=/^[A-Za-z]\w{7,14}$/;
    var m=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var n="[A-Z][a-zA-Z]*";
    var response = {};
     if(typeof req.body.full_name === 'undefined' || req.body.full_name == "" || req.body.full_name == " ") // || !req.body.full_name.match(n))
        throw new Error("Full name is required");
    
    // if(typeof req.body.mobile_no === 'undefined' || req.body.mobile_no == "" || req.body.mobile_no ==" " || !req.body.mobile_no.match(n))
    //     throw new Error("Last Name is required");
       
    if(typeof req.body.email === 'undefined' || req.body.email == "" || req.body.email == " ")
        throw new Error("Email is required");
    if(!m.test(req.body.email))
        throw new Error("Enter a valid email address");
    if(!p.test(req.body.password))
        throw new Error("Have to provide one capital letter one small letter and one number as a password");
    
        
    
    db.Full_name = req.body.full_name;
    db.mobile = req.body.mobile_no;
    db.Email = req.body.email;
    db.Password =  encrypt(req.body.password);
    
    //to find the data from database
    
    userMongo.find({"Email":mail}, function (err,data) {

        if(data.length>0){                   //validation

             response = {
                "error": true,
                "message": "Login credentials already Exist!!",
            };
            return res.status(404).send(response);
        }else{
        db.save(function (err)        //for saving the data in database
        {
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if (err) {
                response = {
                    "error": true,
                    "message": "Error in adding data",
                    "err": err
                };
                
            } else {
                response = {
                    "error": false,
                    "message": "Successfully Registered"
                };
                
            }
            return res.status(200).send(response);
            
        });
     }
 });   
}
catch(e){
   //console.log(e);
   var S = ""+e;
   if (e instanceof ReferenceError || e instanceof TypeError || e instanceof SyntaxError
       || e instanceof RangeError)
   {
    response = {
        "error":true,
        "message":"Something bad happened. Please contact system administrator"
    };
   return res.status(404).send(response);
   } 
   else{
    response = {
        "error":true,
        "message":S
    };
    return res.status(404).send(response);
  }
}
}
//for log in purposes
exports.login = function (req, res) {
    try{
        const secret = "sfgrtfrdfwytuyfg!87632334";
        var mail = req.body.email;
        var pass = encrypt(req.body.password);
        var response = {};
        var p=/^[A-Za-z]\w{7,14}$/;
        var m=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(typeof req.body.email === 'undefined' || req.body.email == "" || req.body.email == " ")
         throw new Error("Email is required");
        if(!m.test(req.body.email))
         throw new Error("Enter a valid email address");
    userMongo.find({"Email":mail,"Password":pass}, function (err, data) {
        // Mongo command to fetch all data from collection.
        if (err) {
            response = {
                "error": true,
                "message": "Error fetching data"
            };
            return res.status(404).send(response);
        } else {
            if(data.length>0){
              var token;
              token = jwt.sign({
                  emailId: mail,
                  password: pass
              }, secret,{
                expiresIn: '12d'
              })
              var userid= data[0]._id;
              var username = data[0].Full_name;
            //   localStorage.setItem('userid'= userid);
            //   localStorage.setItem('token'=token);
            var response = {
                "error": false,
                "message": "login sucessful",
                "token":token,
                "userid":userid,
                "username":username
            };
            return res.status(200).send(response); 
        }
        else{
            var response = {
                "error": false,
                "message": "Invalid credentials"
            };
            return res.status(404).send(response);
        }
        }
        
    });    

   }
   catch(e){
    var S = ""+e;
    if (e instanceof ReferenceError || e instanceof TypeError || e instanceof SyntaxError 
        || e instanceof RangeError)
    {
     response = {
         "error":true,
         "message":"Something bad happened. Please contact system administrator"
     };
    return res.status(404).send(response);
    } 
    else{
     response = {
         "error":true,
         "message":S
     };
     return res.status(404).send(response);
   }

   }
    
}
exports.listOfUsers = function (req, res) {
    // return res.status(200).send("all good");
    var userModel = require('../../model/user.js');
    var response = {};
    var arrList=[];
    console.log("id",req.user);
    var userid=req.params.id;
    userModel.find({"_id":{$ne:userid }},function (err,data) {
        console.log(data);
        for(key in data){
                arrList.push(response={username:data[key].mail,
                                       name:data[key].Full_name,
                                        userid:data[key]._id});
        }
        if(err)
            {
                response={ "error":true,
                            "message":"error retrieving data"
                };
            }
            else{
                response={
                    "error":false,
                    "message":arrList
                };
            }
        return res.status(200).send(response);
    })
}
exports.chatAddHistory = function (userid, username, message, Time){
    var response={};
    var db = new chatMongo();
    db.Userid = userid;
    db.Name = username;
    db.Message = message;
    db.Time = Time;

    db.save(function(err){
        if(err){
            response = {
                "error":true,
                "message": "Error in data fetching"
            };
        //    return res.status(404).send(response); 
        }
        else {
            response = {
                "error":false,
                "message":"Data Saved successfully in database"
            };
            // return res.status(200).send(response);
        }
        
        // console.log(response);
    });
}
exports.chatList = function(req, res){
    var response={};
    chatMongo.find({},function(err, data){
        if(err){
            response = {
                "error":true,
                "message":"Error in fetching data"
            };
            return res.status(404).send(response);
        }else{
            response = {
                "error":false,
                "message":data
            };
            return res.status(200).send(response);
        }
    });
}
exports.peerToPeerChat = function(Username, Send_username, Message, Time){
 var db = new peerToPeerChatMongo();
 db.Username = Username;
 db.Sendername = Send_username;
 db.Message = Message;
 db.Time = Time;
 
 db.save(function(err){
     if(err){
        response = {
            "error":true,
            "message": "Error in data fetching"
        };
     }
     else{
        response = {
            "error":false,
            "message":"Data Saved successfully in database"
        }; 
     }
 });
}
exports.peerToPeerChatList = function(req, res){
    var response={};
    peerToPeerChatMongo.find({}, function(err, data){
        if(err){
            response = {
                "error":true,
                "message":"Error in fetching data"
            };
            return res.status(404).send(response);
        }else{
            response = {
                "error":false,
                "message":data
            };
            return res.status(200).send(response);
        }
    });
} 