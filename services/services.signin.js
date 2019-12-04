const bcrypt = require('bcrypt');

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
    // const signin = (payload, logger,db) => {
    //     new Promise(async (resolve, reject) => {
    //        resolve("fadd hia  bhai")
    //     });
    // }

    const signin = (payload, logger) => new Promise(async (resolve, reject) => {
        try {
            const {email, password, company_id, master_username, master_password} = payload;

            // connect with tenant database for getting database credentials.
            const tenant_db = await Tenantutil.multi_tenant_db_connector(config.db_host, config.db_port, company_id, master_username, master_password, logger);
            

            //Check to see if user is present in the database
            response = await User.findOne({email});

            if(response) {
                //Check the password of the user
                const isMatch = await bcrypt.compare(
                password,
                response.password
                );
    
                if(isMatch){
                    tenant_db.disconnect();
                    resolve("success")
                } else {
                    //Authentication error
                    tenant_db.disconnect();
                    resolve("AE")
                } 
            } else {
                tenant_db.disconnect();
                resolve("AE")
            }

        } catch (error) {
            reject(error);
        }
    })


    return {
        signin,
    }
}