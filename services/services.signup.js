const User = require("../model/loginSchema");
const Masterdata = require("../model/masterSchema");

module.exports = () => {
  /**
   *
   * @param {JSON} payload
   * @param {String} logger
   * @param {String} db
   */

  const signup = (payload, logger, db) =>
    new Promise(async (resolve, reject) => {
      try {
        const { name, email, password, company } = payload;
        const user_id = parseInt(payload.user_id);
        // Check to see if the User with same user_id is present in masterdata
        const validUserCheckResponse = await Masterdata.findOne({
          user_id
        });
        console.log(validUserCheckResponse);

        if (validUserCheckResponse) {
          // Check if email used is already taken
          const emailDuplicacyCheckResponse = await User.findOne({ email });
          if (emailDuplicacyCheckResponse) {
            resolve("FE");
          } else {
            // Declare a constant response_user that will be the new user to be added and sent as a response
            const responseUser = new User({
              name,
              user_id,
              email,
              password,
              company
            });
            await responseUser.save();
            resolve("UC");
            logger.info(
              "'Successfully matched and added signin data with masterdata collection and adding to login collection "
            );
          }
        } else {
          resolve("UR");
        }
      } catch (error) {
        reject(error);
        logger.error(
          "Error while matching signin data with masterdata collection and adding to login collection"
        );
      }
    });

  return {
    signup
  };
};
