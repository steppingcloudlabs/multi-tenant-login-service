const User = require("../model/loginSchema");
const Masters = require("../model/tenantMasterSchema")
const Tenantutil = require("../util/index")();
const config = require("../config/index")

const mongoose = require('mongoose');


const { Schema } = mongoose;
module.exports = () => {
    /**
     *
     * @param {JSON} payload
     * @param {String} logger
     * @param {String} db
     */

    const signup = (payload, logger) =>
        new Promise(async(resolve, reject) => {
            try {
                const { name, email, password, company_id, master_password, master_username } = payload;
                const user_id = parseInt(payload.user_id);
                // connect with alpha database for getting database credentials.
                const tenant_db = await Tenantutil.multi_tenant_db_connector(config.db_host, config.db_port, company_id, master_username, master_password, logger);
                // Check to see if the User with same user_id is present in masterdata

                const validUserCheckResponse = await Masters.findOne({ user_id });

                if (validUserCheckResponse) {
                    // Check if email used is already taken
                    const emailDuplicacyCheckResponse = await User.findOne({ email });

                    // Check if user_id used is already taken
                    const user_idDuplicacyCheckResponse = await User.findOne({ user_id });
                    
                    if (emailDuplicacyCheckResponse) {
                        tenant_db.disconnect()
                        resolve("FE");

                    } else if(user_idDuplicacyCheckResponse) {
                        tenant_db.disconnect()
                        resolve("FID");
                    } else {
                        // Declare a constant response_user that will be the new user to be added and sent as a response
                        const responseUser = new User({
                            name,
                            user_id,
                            email,
                            password
                        });
                        await responseUser.save();
                        tenant_db.disconnect()
                        resolve("UC");
                        logger.info(
                            "Successfully Created User! "
                        );
                    }

                } else {
                    tenant_db.disconnect()
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