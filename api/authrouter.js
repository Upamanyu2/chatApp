var express = require('express');
var router = express.Router();

var users = require('./Controller/userController.js');
var auth = require('./Authentication');

router.get('/users/:id/list',auth, users.listOfUsers);
router.get('/users/chatList',auth, users.chatList);
router.get('/users/peerToPeerChatList',auth, users.peerToPeerChatList);
module.exports = router;