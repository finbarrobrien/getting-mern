/**
 * Created by Finbarr on 15/02/2017.
 */
import mongoose from 'mongoose';

import LocationSchema from './rest_api/models/LocationSchema';

let dbURI = 'mongodb://localhost/Loc8r';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGODB_URI;
}

// Globally accessible MongoDB connection called 'mongoDBConn'
const mongoDbConn = mongoose.createConnection(dbURI);

const connectLog = () => {
  console.log(`Mongoose new connection to ${mongoDbConn.host}:${mongoDbConn.port}/${mongoDbConn.name}`);
};

const errorLog = (err) => {
  console.log(`Mongoose connection error ${err}`);
};

const disconnectLog = () => {
  console.log(`Mongoose disconnected from ${mongoDbConn.host}:${mongoDbConn.port}`);
};

const gracefulShutdown = (msg, callback) => {
  mongoDbConn.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

process.once('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});


mongoDbConn.on('connected', connectLog);

mongoDbConn.on('error', errorLog);

mongoDbConn.on('disconnected', disconnectLog);

mongoose.model('Location', LocationSchema);

export default mongoDbConn;
