/**
 * Created by 99116 on 2016/8/8.
 */

$(document).ready(function(){
    $("#sendMsgBtn").click(function(){
        var username = $("#username").val();
        var msgContent = $("#msgContent").val();
        socket.emit('sendMsg',{username:username,msgContent:msgContent});
        displayMsg(username,msgContent);
        clearInput();
    });
});

function displayMsg(username,msgContent){
    var displayContent = '<div>【'+username+'】说:</div>';
    displayContent = displayContent + '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+msgContent+'</div>';
    $("#msgDialog").append(displayContent);
}

function displaySysMsg(username){
    var displayContent = '<div class="text-info text-center">系统消息:欢迎【'+username+'】进入聊天室！！！</div>';
    $("#msgDialog").append(displayContent);
}
function clearInput(){
    $("#msgContent").val('');
}

function displayMembers(members,username){
    var membersHtml = "";
    for(var i=0;i<members.length;i++){
        membersHtml = membersHtml + '<li id="'+members[i]+'">'+members[i]+'</li>';
    }
    membersHtml = membersHtml + '<li id="'+username+'">'+username+'</li>';
    $("#members").append(membersHtml);
}

function addMember4Enter(username){
    var membersHtml = '<li id="'+username+'">'+username+'</li>';
    $("#members").append(membersHtml);
}

function removeMember4Disconnect(username){
    $("#"+username).remove();
}