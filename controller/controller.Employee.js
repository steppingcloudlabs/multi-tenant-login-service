  /* eslint-disable no-plusplus */
  /* eslint-disable no-await-in-loop */

  const signupEmployeeService = require('../services/services.signupEmployee')();

  module.exports = () => {

     /*
      *Add Employee
      */

     const signupEmployee = async (req, res, next, {
        logger,
        db
     }) => {
        try {
           const payload = req.body;

           const response = await signupEmployeeService.signupEmployee(payload, logger, db);
           if (response == 'foundEmail') {
              res.status(200).send({
                 status: '200',
                 result: 'Email Id Already Exists'
              })
           } else if (response && response.length == null) {
              res.status(200).send({
                 status: 200,
                 message: response,
              })

           } else {
              res.status(200).send({
                 status: 400,
                 msg: 'Invalid Data'
              });
           }
           logger.info('Signin successful');
        } catch (error) {
           next(error);
           logger.error(`Error while signing in`);

        }
     }

     return {
        signupEmployee,
     }

  }