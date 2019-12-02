const express = require('express');

const router = express.Router();
const signupController = require('../controller/controller.signup')();
const roleController = require('../controller/controller.roles')();
const getController = require('../controller/controller.getEverything')()

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

    /**
     * Roles APIs.
     */
    router
        .route('/addRole')
        .post((req, res, next) => roleController
            .addRole(req, res, next, { logger, db }));


     /**
     * getRole APIs
     */
    router
        .route('/getrole')
        .get((req, res, next) => getController.getrole(req, res, next, { logger, db }));


  return router;
};
