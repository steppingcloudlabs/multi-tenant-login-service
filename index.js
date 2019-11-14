const dotenv = require('dotenv');

dotenv.config();
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

// CORS
app.use(cors());

// Body Parser config
app.use(bodyParser.urlencoded({
  parameterLimit: 10,
  limit: '200mb',
  extended: false,
}));

// Json Parser config
app.use(bodyParser.json());

// Apply helment configurations
app.use(helmet());
app.disable('x-powered-by');
app.use(helmet.xssFilter());
app.use(helmet.frameguard());

// Configure databases here.
const mongo = require('./mongo');
/**
 * Aplha  REST APIs
 */

app.get('/', (req, res, next) => {
  res.send({
    code: 200,
    message: 'Faad chal rha hai.',
  });
});


app.use(
  '/api/v1',
  require('./routes/routes')({
    logger,
    db: mongo
  }),
);

/**
 * Server
 */
app.listen(config.port, () => {
  console.log(`Server listening on port: ${config.port}`);
});