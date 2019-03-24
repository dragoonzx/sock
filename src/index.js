var app = require('express')();
var http = require('http').Server(app);
//var https = require('https').Server(app);
var io = require('socket.io')(http);
//var io = require('socket.io')(https);
var a = [];

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
socket.on('eventServer', function (data) {

console.log('user connected '+ socket.id);
// io.emit('eventClient', { for: 'everyone', data: 'sosite chlen' });
console.log(data);
if (a == false) {
	console.log(1);
a.push({info:data.info,time: data.time});
setTimeout(timeCheck,3500)
}else if (a[0].time > data.time - 3500) {
	console.log(2);
a.push({info:data.info,time:data.time});
}else {
	console.log(3);
a.push({});
io.emit('eventClient', { info: a, message: 'передача закончилась' });
a = {};
}
// console.log('u was disco');
// socket.emit('eventClient', { data: 'Hello Client' + data.time });
});
socket.on('disconnect', function () {
console.log('user disconnected');
});
});

http.listen(8000, function(){
console.log('listening on *:8000');

});
// https.listen(8000, function(){
// console.log('listening ssl on *:8000');

// });
function timeCheck(){
	io.emit('eventClient', { info: a, message: 'передача закончилась' });
	a={};
}