function disablejoin() {
  document.getElementById("join").disabled=true
};
disablejoin();
    
    
function enablejoin() {
  document.getElementById("join").disabled=false
};
    
    
function maybeClearText() {
  if($("#fname").val()=='Enter your name:') {
    $("#fname").val("");
    $("#wmsg").hide();
    enablejoin();
  }
};
    
    
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