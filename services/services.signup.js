const User = require("../model/loginSchema");
const AlphaMasterData = require("../model/alphaMasterSchema");
const TenantMasterData = require("../model/tenatMasterSchema")
const Tenantutil = require("../util/index")();
const config = require("../config/index")
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
                const { name, email, password, tenant_id } = payload;
                const user_id = parseInt(payload.user_id);
                // connect with alpha database for getting database credentials.
                const tenant_information = await AlphaMasterData.findOne({ company_id: tenant_id }, { _id: 0, company_id: 1, master_username: 1, master_password: 1 })
                    // const { company_id, master_username, master_password } = tenant_information;
                console.log(tenant_information.company_id)
                    // connecting with tenant database using credentials
                const tenant_db = await Tenantutil.multi_tenant_db_connector(config.db_host, config.db_port, company_id, master_username, master_password, logger);
                // Check to see if the User with same user_id is present in masterdata
                const validUserCheckResponse = await TenantMasterData.Masterdata.findOne({
                    user_id
                });
                console.log(validUserCheckResponse)
                resolve(validUserCheckResponse)
                    // if (validUserCheckResponse) {
                    //     // Check if email used is already taken
                    //     const emailDuplicacyCheckResponse = await User.findOne({ email });
                    //     if (emailDuplicacyCheckResponse) {
                    //         resolve("FE");
                    //     } else {
                    //         // Declare a constant response_user that will be the new user to be added and sent as a response
                    //         const responseUser = new User({
                    //             name,
                    //             user_id,
                    //             email,
                    //             password,
                    //             company
                    //         });
                    //         await responseUser.save();
                    //         resolve("UC");
                    //         logger.info(
                    //             "'Successfully matched and added signin data with masterdata collection and adding to login collection "
                    //         );
                    //     }
                    // } else {
                    //     resolve("UR");
                    // }
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