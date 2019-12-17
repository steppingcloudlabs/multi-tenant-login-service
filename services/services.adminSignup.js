const User = require("../model/loginSchema");
const Masters = require("../model/tenantMasterSchema")
const Role = require("../model/role")
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
        new Promise(async (resolve, reject) => {
            try {
                const { email, password, user_type, subscribed_service, company_id, master_password, master_username } = payload;
                const user_id = parseInt(payload.user_id);

                // connect with tenant database for getting database credentials.
                const tenant_db = await Tenantutil.multi_tenant_db_connector(config.db_host, config.db_port, company_id, master_username, master_password, logger);

                // Check if email used is already taken
                const emailDuplicacyCheckResponse = await User.findOne({ email });

                // Check if user_id used is already taken
                const user_idDuplicacyCheckResponse = await User.findOne({ user_id });

                if (emailDuplicacyCheckResponse) {
                    tenant_db.disconnect()
                    resolve("FE");

                } else if (user_idDuplicacyCheckResponse) {
                    tenant_db.disconnect()
                    resolve("FID");
                } else {
                        const role = await Role.findOne({ role: "king" }, { _id: 1 })
                        // Declare a constant response_user that will be the new user to be added and sent as a response
                        const responseUser = new User({
                            user_id,
                            email,
                            password,
                            user_type: 'admin',
                            subscribed_service,
                            role,
                        });

                        await responseUser.save();
                        tenant_db.disconnect()
                        resolve("UC");
                        logger.info(
                            "Successfully Created Admin "
                        );
                }

            } catch (error) {
                reject(error);
                logger.error(
                    "Error while signing up admin"
                );
            }
        });

    return {
        signup
    };
};