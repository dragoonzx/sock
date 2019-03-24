var express = require('express')();
//var http = require('http').Server(app);
var https = require('https').Server(app);
//var io = require('socket.io')(http);
const fs = require('fs');
var io = require('socket.io')(https);
var app = express();
var a = [0,0];

const options = {
	key: fs.readFileSync('your_domain.key'),
	cert: fs.readFileSync('your_domain.crt')
  };

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
	socket.on('eventServer', function (data) {
		
		console.log('user connected'+ socket.id);
		io.emit('eventClient', { for: 'everyone', data: 'sosite chlen' });
		console.log(a);
		a[0] += 1;
		console.log(a);
		console.log(data);
		
		console.log('u was disco');
		socket.emit('eventClient', { data: 'Hello Client' + data.time });
	});
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
});

/*http.listen(8000, function(){
	console.log('listening on *:8000');
	
});*/
var http = http.createServer(app);
register(http);
http.listen(80);

var https = https.createServer(app, { key: fs.readFileSync('your_domain.key'), cert: fs.readFileSync('your_domain.crt') });
register(https);
https.listen(443);