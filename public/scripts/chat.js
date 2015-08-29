var socket = io();
var fname = window.location + '';
fname = fname.split("=")[1];
  
$("#wmsg").text("Welcome to FSE Chat, " + fname +  ". Enjoy!") ;
$("#wmsg").show();

// Get the current date and time.
function myDateTime() {
  var year = new Date().getFullYear();
  var month = (1 + new Date().getMonth());
  var day = new Date().getDate();
  var hours = new Date().getHours();
  var minutes =new Date().getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day: day;
  
  var datetime = month + '.' + day + '.' + year + '  '
      + hours + ':' + minutes + ' ' + ampm;
  
  return datetime
};

// Display a message when a user leaves the chat room.
window.onbeforeunload = function (event) {
  socket.emit('user event', fname + ' left the chat room');   
};


$(document).ready(function () {
  if (!fname) {
    // User hasn't provided a name. Send user to welcome page.
    window.location = '/';
  }
  // Display a message when a user joins the chat room.
  socket.emit('user event', fname + ' joined the chat room');
  pageScroll();
});


// Display chat messages along with name and current time.
function Displaychat(name,dnt,usr_msg) {
  var user_name = $('<div class="username">').text(name);
  var date_time = $('<div class="timestamp">').text(dnt);
  var user_msg = $('<div class="usermessage">').text(usr_msg);
  
  $('#messages')
    .append($('<li>')
    .append(user_name)
    .append(date_time)
    .append(user_msg));
  pageScroll();
};


// Scroll to the most recent message.
function pageScroll() {
  var scrollHeight = $("#messages-container")[0].scrollHeight;
  $("#messages-container").animate({scrollTop: scrollHeight});
};


// Disable the 'Post' button.
function disablepost() {
  document.getElementById("post").disabled=true
};
disablepost();


// Clear the informational message and enable the 'Post' button.
function maybeClearText() {
  if($("#m").val()=='Enter your message here...') {
    $("#m").val("");
    $("#m").removeClass("italic");
    document.getElementById("post").disabled=false;
  }
};
    

// Display helper message and disable the 'Post' button.
function maybeAddText() {
  if($("#m").val().trim()=='') {
    $("#m").val('Enter your message here...');
    $("#m").addClass("italic");
    disablepost();
    }
};


$('form').submit(function() {
  Displaychat("me", myDateTime(), $('#m').val());
  // Send user_name + user_messages + time to the server.
  socket.emit('chat message', fname +  '||' + myDateTime() + "||" + $('#m').val());   
  $('#m').val('');
  return false;
});
  
  
socket.on('chat message', function(msg) {  
  var name = msg.split("||")[0];
  var time = msg.split("||")[1];
  var ms = msg.split("||")[2];

  Displaychat(name,time,ms);
});
  
  
socket.on('user event', function(msg) {
  $('#messages').append($('<li class=italic>').text(msg));
  pageScroll();
});