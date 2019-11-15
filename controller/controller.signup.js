/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */

const signupService = require("../services/services.signup")();

module.exports = () => {
  /**
   *
   * @param {String} req
   * @param {String} res
   * @param {} next
   * @param {} param3
   */

  const signup = async (req, res, next, { logger, db }) => {
    try {
      const payload = req.body;
      const response = await signupService.signup(payload, logger, db);
      if (response == "UR") {
        res.status(200).send({
          status: "400",
          message: `User is not an Alumni of this company`
        });
      } else if (response == "FE") {
        res.status(200).send({
          status: "400",
          message: `${payload.email} already exists.`
        });
      } else {
        res.status(200).send({
          status: "200 OK",
          message: `User created with email id ${payload.email} `
        });
        logger.info(
          `User with email id ${payload.email} signed up and added to login collection `
        );
      }
    } catch (error) {
      next(error);
      logger.error(`Error while creating user `);
    }
  };

  return {
    signup
  };
};
