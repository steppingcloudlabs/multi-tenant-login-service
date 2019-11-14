const express = require('express');

const router = express.Router();
const employeeController = require('../controller/controller.Employee')();

module.exports = ({
   logger,
   db
}) => {
   router
      .route('/employee/signup')
      .post((req, res, next) => {
         return employeeController.signupEmployee(req, res, next, {
            logger,
            db
         });
      })
   return router;
}