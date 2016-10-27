var express = require('express');
var app = express();
var http = require('http')
	.Server(app);
var io = require('socket.io')(http);
var fs = require('fs');



// fs.readFile('package.json', function (err, data) {
// 	console.log('FILEDATA is ', data.toString());
// 	return data;
// });

var SF_MODULES_BASEFOLDER = __dirname + "/clients/sfui-composer/sf-modules/";

app.get('/', function (req, res) {
	res.send('<h1>Hello world</h1>');
});

var oneDay = 86400000;

//app.use(express.compress());
// console.log('Routes are :');
// console.log('/sfui/composer\t\t=\t'+ __dirname +'/clients/sfui-composer');
// console.log('/sfui/demos/calculator\t=\t'+__dirname + '/clients/demos/calculator');

app.use('/sfui/demos/calculator', express.static(__dirname + '/clients/demos/calculator' /*, { maxAge: oneDay }*/ ));




io.on('connection', function (socket) {
	var _socket = socket;
	console.log('a user connected');

	socket.on('disconnect', function (socket) {
		console.log('user disconnected');
	});

	socket.on('sendFullTree', function (data) {
		console.log('********* EVENT : sendFullTree ');
		_socket.broadcast.emit('sendFullTree', data);
	});

	socket.on('sendUpdate', function (data) {
		console.log('********* EVENT : sendUpdate ');
		_socket.broadcast.emit('sendUpdate', data);
	});

	socket.on('SF_Composer_RequestConfig', function (data) {
		console.log('********* EVENT: SF_Composer_RequestConfig');
		_socket.broadcast.emit('SF_Composer_RequestConfig', data);
	});
	socket.on('SF_Client_ConfigExport', function (data) {
		console.log('********* EVENT: SF_Client_ConfigExport');
		_socket.broadcast.emit('SF_Client_ConfigExport', data);
	});
	socket.on('SF_Composer_pushConfig', function (data) {
		console.log('********* EVENT: SF_Composer_pushConfig');
		_socket.broadcast.emit('SF_Composer_pushConfig', data);
	});

	socket.on('SF_Composer_saveFile', function (data) {
		// console.log('********* EVENT: SF_Composer_saveFile \n data is',data);
		fs.writeFile(SF_MODULES_BASEFOLDER + data.filePath, data.fileData, function (err) {
			console.log('File write success for ', data.filePath, err);

			if (err) {
				console.log('Error while writing %s. \n\tError is :', data.filePath, err);
				data.error = err;
				_socket.emit('SF_Server_fileSave_error', data);
				return;
			}
			_socket.emit('SF_Server_fileSave_success', data);
		});
	});

	socket.on('SF_Composer_libraryList', function (data) {
		console.log('********* EVENT: SF_Composer_libraryList \n data is',data);

		fs.readdir(SF_MODULES_BASEFOLDER + data, function (err, files) {
			if (err) {
				return console.error(err);
			}
			_socket.emit('SF_Server_libraryList',files);

			files.forEach(function (file) {
				console.log(file);
			});
		});

	});
});

http.listen(PORT, function () {
	console.log('listening on port ',PORT);
});
