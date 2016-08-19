/**
 * Created by 99116 on 2016/8/1.
 */
var express = require('express');
var router = express.Router();

router.post('/enterRoom',function(req,res,next){
    var username = req.body.username;
    console.log(username);
    res.render('chatRoom',{username:username});
});

module.exports = router;