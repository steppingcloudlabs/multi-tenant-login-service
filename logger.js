/**
 * Logger | Bunyan
 */
const bunyan = require('bunyan');
const path = require('path');
const config = require('./config');

module.exports = () => {
  function reqSerializer(req) {
    return {
      method: req.method,
      url: req.url,
      headers: req.headers,
    };
  }
  const logger = bunyan.createLogger({
    name: config.name,
    src: true,
    streams: [{
      type: 'rotating-file',
      level: 'info', // loging level
      path: config.env === 'development' ? path.resolve(__dirname, 'log/development-info.log') : path.resolve(__dirname, 'log/production-info.log'),
      period: '1d', // daily rotation
      count: 3, // keep 3 back copies
    },
    {
      type: 'rotating-file',
      level: 'fatal', // loging level
      path: config.env === 'development' ? path.resolve(__dirname, 'log/development-fatal.log') : path.resolve(__dirname, 'log/production-fatal.log'),
      period: '1d', // daily rotation
      count: 3, // keep 3 back copies
    },
    {
      type: 'rotating-file',
      level: 'error', // loging level
      path: config.env === 'development' ? path.resolve(__dirname, 'log/development-error.log') : path.resolve(__dirname, 'log/production-error.log'),
      period: '1d', // daily rotation
      count: 3, // keep 3 back copies
    },
    {
      type: 'rotating-file',
      level: 'warn', // loging level
      path: config.env === 'development' ? path.resolve(__dirname, 'log/development-warn.log') : path.resolve(__dirname, 'log/production-warn.log'),
      period: '1d', // daily rotation
      count: 3, // keep 3 back copies
    },
    {
      type: 'rotating-file',
      level: 'debug', // loging level
      path: config.env === 'development' ? path.resolve(__dirname, 'log/development-debug.log') : path.resolve(__dirname, 'log/production-debug.log'),
      period: '1d', // daily rotation
      count: 3, // keep 3 back copies
    },
    {
      type: 'rotating-file',
      level: 'trace', // loging level
      path: config.env === 'development' ? path.resolve(__dirname, 'log/development-trace.log') : path.resolve(__dirname, 'log/production-trace.log'),
      period: '1d', // daily rotation
      count: 3, // keep 3 back copies
    },
    ],
    serializers: {
      req: reqSerializer,
    },
  });
  return logger;
};
