var mongoose =  require('mongoose');
var dbURI = 'mongodb://localhost/Loc8r';
if(process.env.NODE_ENV === 'production'){
	dbURI = process.env.MONGODB_URI;
}
var loc8rConn = mongoose.createConnection(dbURI);
require('./location');


var connectLog = function(){
	console.log('Mongoose connected to '+dbURI)
};

var errorLog = function(err){
	console.log('Mongoose connection error '+ err)
};

var disconnectLog = function(){
	console.log('Mongoose disconnected from '+dbURI)
};

loc8rConn.on( 'connected', connectLog);

loc8rConn.on( 'error', errorLog);

loc8rConn.on( 'disconnected', disconnectLog);

var gracefulShutdown = function(msg, callback){
	mongoose.connection.close(function(){
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