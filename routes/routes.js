const express = require('express');

const router = express.Router();
const signupController = require('../controller/controller.signup')();

module.exports = ({
  logger,
  db,
}) => {
  router
    .route('/signup')
    .post((req, res, next) => signupController.signup(req, res, next, {
      logger,
      db,
    }));
  return router;
};
