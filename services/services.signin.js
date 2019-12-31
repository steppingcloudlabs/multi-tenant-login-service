const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const Tenantutil = require("../util/index")();
const config = require("../config/index")
const User = require("../model/loginSchema");
const role = require('../model/role')

module.exports = () => {
    /**
    *
    * @param {JSON} payload
    * @param {String} logger
    * @param {String} db
    */

    const signin = (payload, logger) => new Promise(async (resolve, reject) => {
        try {
            const { email, password, company_id, master_username, master_password } = payload;

            // connect with tenant database for getting database credentials.
            const tenant_db = await Tenantutil.multi_tenant_db_connector(config.db_host, config.db_port, company_id, master_username, master_password, logger);


            //Check to see if user is present in the database
            response = await User.findOne({ email })

            if (response) {
                //Check the password of the user
                const isMatch = await bcrypt.compare(
                    password,
                    response.password
                );

                if (isMatch) {
                    tenant_db.disconnect();
                    const token = JWT.sign({
                        iss: 'steppingcloudforsignin',
                        sub: response.email,
                        algorithm: 'HS256',
                        iat: new Date().getTime(),
                        exp: new Date().setTime(new Date().getTime() + 15*60*1000),
                    },
                        config['jwt_secret_key']
                    )
                    resolve({ ...response.toJSON(), token });
                } else {
                    //Authentication error
                    tenant_db.disconnect();
                    resolve("AF")
                }
            } else {
                tenant_db.disconnect();
                resolve("AF")
            }

        } catch (error) {
            console.log(error)
            reject(error);
        }
    })


    return {
        signin,
    }
}