const Tenantutil = require("../util/index")();
const config = require("../config/index")
const User = require("../model/loginSchema");

module.exports = () => {
    /**
    *
    * @param {JSON} payload
    * @param {String} logger
    * @param {String} db
    */

    const deleteUser = (payload, logger) => new Promise(async (resolve, reject) => {
        try {
            const { email, company_id, master_username, master_password, token, role } = payload;

            // connect with tenant database for getting database credentials.
            const tenant_db = await Tenantutil.multi_tenant_db_connector(config.db_host, config.db_port, company_id, master_username, master_password, logger);


            //Check to see if user is present in the database
            response = await User.findOne({ email });

            if(response) {
                User.deleteOne({response});
                tenant_db.disconnect()
                resolve("DU")
            } else {
                resolve("NF")
            }

        } catch (error) {
            console.log(error)
            reject(error);
        }
    })


    return {
        deleteUser,
    }
}