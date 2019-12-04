const Role = require('../model/role')
const Tenantutil = require('../util/index')()
const config = require("../config/index")

module.exports = () => {

    const addRole = (payload, logger) => new Promise(async (resolve, reject) => {


        try {
            const { role, permission, company_id, master_username, master_password } = payload;
            //Create a connection with the tenant_database were working on
            const tenant_db = await Tenantutil.multi_tenant_db_connector(config.db_host, config.db_port, company_id, master_username, master_password, logger);

            const duplicacyCheckResponse = await Role.findOne({ role });
            if (duplicacyCheckResponse) {
                tenant_db.disconnect();
                resolve('FR')
            } else {
                const response = new Role({ role, permission })
                await response.save()
                tenant_db.disconnect();
                resolve("success")
            }

        } catch (error) {
            reject(error)
        }
    })

    const deleteRole = (payload, logger) => new Promise(async (resolve, reject) => {
        try {
            const { company_id, master_username, master_password } = payload;

            //Create a connection with the tenant_database were working on
            const tenant_db = await Tenantutil.multi_tenant_db_connector(config.db_host, config.db_port, company_id, master_username, master_password, logger);

            const { role } = payload
            const presentCheckResponse = await Role.findOneAndDelete({ role: role });
            if (presentCheckResponse) {
                resolve('success')
            } else {

                resolve("NF")
            }

        } catch (error) {
            reject(error);
        }
    })

    return {
        addRole,
        deleteRole
    }
}