/**
 * Created by 99116 on 2016/7/28.
 */
var express = require('express');
var router = express.Router();
var http = require('http');

var server = http.createServer(function(req,res){
    console.log('AA');
}).listen(8888);

var io = require('socket.io').listen(server);
var members = new Array();
io.on('connection',function(socket){
    console.log('Connected ......'+process.pid);
    socket.emit('welcome',{members:members});

    socket.on('enter',function(data){
        var username = data.username;
        console.log('qq:'+username);
        members.push(username);
        socket.name=username;
        socket.broadcast.emit('welcomeMember',members,username);
    });

    socket.on('sendMsg',function(data){
        var username = data.username;
        var msgContent = data.msgContent;
        console.log(username+":"+msgContent);
        socket.broadcast.emit('sendMsg.group',username,msgContent);
    });

    socket.on('disconnect',function(){
        console.log('disconnect:'+socket.name);
        var i = members.indexOf(socket.name);
        console.log(i);
        members.splice(i,i+1);
        socket.broadcast.emit('members.update',socket.name,members);
    });

});

module.exports = router;