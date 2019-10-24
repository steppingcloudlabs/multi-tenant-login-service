const dotenv = require('dotenv');

// Body Parser for req/res
const bodyParser = require('body-parser');

const express = require('express');
/**
 * Middleware Decleration
 */

// using CORS
const cors = require('cors');

// Helmet for request security.
const helmet = require('helmet');

const config = require('./config');
// Bunyan logger
const logger = require('./logger')();

// express init
const app = express();

// dotenv init
dotenv.config();
// CORS
app.use(cors());

// Body Parser config
app.use(bodyParser.urlencoded({
  parameterLimit: 10,
  limit: '1mb',
  extended: false,
}));

// Json Parser config
app.use(bodyParser.json());

// Apply helment configurations
app.use(helmet());
app.disable('x-powered-by');
app.use(helmet.xssFilter());
app.use(helmet.frameguard());


/**
 * Authentication and Authorization REST APIs
 */

app.get('/', (req, res, next) => {
  res.send({
    code: 200,
    message: 'Faad chal rha hai.',
  });
});

/**
 * Server
 */
app.listen(config.port, () => {
  console.log(`Server listening on port: ${config.port}`);
});
