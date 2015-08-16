/*
 * Module dependencies
 */
var express = require('express')
var app = express();
var stylus = require('stylus');
var nib = require('nib');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb3.db');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
app.use(stylus.middleware({
  src: __dirname + '/public',
  compile: compile
}));
app.use(express.static(__dirname + '/public'));


db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS chat (name TEXT, time TEXT, ms TEXT)");
});


app.get('/', function(req, res){
  res.render('welcome');
});


app.get('/chatroom', function(req, res){
  db.all("SELECT *  FROM chat", function(err, rows) {
    res.render('chat', {
      messages : rows
    });
  });
});


io.on('connection', function(socket) {
  socket.on('chat message', function(msg)
  {
    console.log('chat message: ' + msg);
    socket.broadcast.emit('chat message', msg);
    var name = msg.split("||")[0];
    var time = msg.split("||")[1];
    var ms = msg.split("||")[2];
    
    var stmt = db.prepare("INSERT INTO chat VALUES (?, ?, ?)");
    stmt.run(name, time, ms);
    stmt.finalize();
  });
  
  socket.on('user event', function(msg)
  {
    console.log('user event: ' + msg);
    socket.broadcast.emit('user event', msg);
  });
    
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
