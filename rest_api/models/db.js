require('mongoose');
require('./location');

var connectLog = function(){
	console.log('Mongoose new connection to '+mongoDbConn.host+":"+mongoDbConn.port+"/"+mongoDbConn.name);
};

var errorLog = function(err){
	console.log('Mongoose connection error '+ err);
};

var disconnectLog = function(){
	console.log('Mongoose disconnected from '+mongoDbConn.host+":"+mongoDbConn.port);
};

mongoDbConn.on( 'connected', connectLog);

mongoDbConn.on( 'error', errorLog);

mongoDbConn.on( 'disconnected', disconnectLog);

var gracefulShutdown = function(msg, callback){
	mongoDbConn.close(function(){
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
};

process.once('SIGUSR2', function(){
	gracefulShutdown('nodemon restart', function(){
		process.kill(process.pid, 'SIGUSR2');
	});
});

process.on('SIGINT', function(){
	gracefulShutdown('app termination', function(){
		process.exit(0);
	});
});

process.once('SIGTERM', function(){
	gracefulShutdown('Heroku app shutdown', function(){
		process.exit(0);
	});
});
