// Disable the 'Join' button.
function disablejoin() {
  document.getElementById("join").disabled=true
};
disablejoin();
    

// Clear the informational messages on the welcome page and enable the 'Join' button.
function maybeClearText() {
  if($("#fname").val()=='Enter your name:') {
    $("#fname").val("");
    $("#wmsg").hide();
    document.getElementById("join").disabled=false
  }
};
    

// Display informational messages on the welcome page and disable the 'Join' button.
function maybeAddText() {
  if($("#fname").val().trim()=='') {
    $("#fname").val('Enter your name:');
    $("#wmsg").text("It is required to enter your name to join the chat room...") ;
    $("#wmsg").show();
    disablejoin();
    }
};
    
    
$('form').submit(function() {
  window.location = '/chatroom?fname=' +  $('#fname').val();
  return false;
});