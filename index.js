const Controller = require('./controller').Controller;
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
var pythonStreamProcess;

server.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

let tank = new Controller();

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('action', function (data) {

  	switch (data) {
  		case "forward":
  			tank.forward()
  			break;

  		case "back":
  			tank.back();
  			break;

		case "left":
			tank.turnLeft();
			break;

		case "right":
			tank.turnRight();
			break;

		default:
			tank.stop();
  	}

    console.log(data);
  });
});

process.on('SIGINT', function() {
  // @todo Set all servos to 0;
  console.log("Caught interrupt signal");
  tank.stop();
  process.exit();
});


function startPythonStream() {
  console.log('HI THERE')
  var spawn = require("child_process").spawn;
  pythonStreamProcess = spawn('python3', ["./stream.py"]);

  pythonStreamProcess.on('close', (code) => {
    console.log(`child process closed with code ${code}`);
  });

  pythonStreamProcess.on('disconnect', (code) => {
    console.log(`child process disconnect with code ${code}`);
  });

  pythonStreamProcess.on('exit', (code) => {
    console.log(`child process exit with code ${code}`);
  });

  pythonStreamProcess.on('message', (code) => {
    console.log(`child process message with code ${code}`);
  });

  pythonStreamProcess.on('error', (code) => {
    console.log(`child process error with code ${code}`);
  });

  // pythonStreamProcess.stdout.on('data', function(data) {
  //   console.log(data.toString('ascii'))
  // } )
}

startPythonStream();