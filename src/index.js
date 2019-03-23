var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var a = [0,0];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
	socket.on('eventServer', function (data) {
		console.log('user connnected');
		if (a[0]=== 0 ){

		}
		console.log(a);
		a += 1;
		console.log(a);
		console.log(data);
		socket.emit('eventClient', { data: 'Hello Client' + data.time });
	});
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
});

http.listen(8000, function(){
	console.log('listening on *:8000');
	
});