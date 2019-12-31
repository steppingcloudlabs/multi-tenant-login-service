const express = require('express');

const router = express.Router();
const signupController = require('../controller/controller.signup')();
const adminSignupController = require('../controller/controller.adminSignup')();
const godSignupController = require('../controller/controller.godSignup')()
const demiGodSignupController = require('../controller/controller.demiGodSignup')()
const signinController = require('../controller/controller.signin')();
const memberController = require('../controller/controller.members')();
const roleController = require('../controller/controller.roles')();
const getController = require('../controller/controller.getEverything')()
const deleteUserController = require('../controller/controller.deleteUser')()

module.exports = ({
  logger,
  db,
}) => {
  router
    .route('/user/signup')
    .post((req, res, next) => signupController.signup(req, res, next, {
      logger,
      db,
    }));

    router
    .route('/admin/signup')
    .post((req, res, next) => adminSignupController.signup(req, res, next, {
      logger,
      db,
    }));

    router
    .route('/signin')
    .post((req, res, next) => signinController.signin(req, res, next, {
      logger,
      db,
    }));

    router
    .route('/member')
    .post((req, res, next) => memberController.addMember(req, res, next, {logger,db,}))
    .get((req, res, next) => memberController.getMember(req, res, next, {logger,db,}))


    router
    .route('/delete/user')
    .delete((req, res, next) => deleteUserController.deleteUser(req, res, next, {
      logger,
      db,
    }));

    /**
     * Private APIs
     */
    router
    .route('/private/godsignup')
    .post((req, res, next) => godSignupController.signup(req, res, next, {logger,db,}))

    router
    .route('/private/demigodsignup')
    .post((req, res, next) => demiGodSignupController.signup(req, res, next, {logger,db,}))


    /**
     * Roles APIs.
     */
    router
        .route('/role')
        .post((req, res, next) => roleController.addRole(req, res, next, { logger, db }))
        .get((req, res, next) => getController.getRole(req, res, next, { logger, db }))
        .delete((req, res, next) => roleController.deleteRole(req, res, next, { logger, db }))



  return router;
};
