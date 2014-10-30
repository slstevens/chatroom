var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.broadcast.emit('userConnection', 'A user connected')

  socket.on('chat message', function(msg){
  	io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
  	// on disconnect, it displays the text 'user disconnected'
  	io.emit('disconnect', 'A user disconnected');
  });

  socket.on('nickname', function(name) {
  	io.emit('nickname', name);
  });
});

http.listen(3000, function() {
	console.log('listening on *:3000');
});