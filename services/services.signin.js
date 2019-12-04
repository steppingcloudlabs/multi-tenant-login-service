const Tenantutil = require("../util/index")();
const config = require("../config/index")

module.exports = () => {
    /**
    *
    * @param {JSON} payload
    * @param {String} logger
    * @param {String} db
    */
    // const signin = (payload, logger,db) => {
    //     new Promise(async (resolve, reject) => {
    //        resolve("fadd hia  bhai")
    //     });
    // }

    const signin = (payload, logger) => new Promise(async (resolve, reject) => {
        try {
            const {email, password} = payload;
            // connect with tenant database for getting database credentials.
            const tenant_db = await Tenantutil.multi_tenant_db_connector(config.db_host, config.db_port, company_id, master_username, master_password, logger);

        } catch (error) {
            reject(error);
        }
    })


    return {
        signin,
    }
}