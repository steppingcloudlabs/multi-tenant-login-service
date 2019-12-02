const mongo = require('mongoose');
const logger = require('../logger')();

module.exports = () => {
    const multi_tenant_db_connector = (payload, logger) => new Promise(resolve, reject) => {
        try {
            const { db_host, db_port, db_name, db_username, db_password } = payload;
            const uri = `mongodb://${db_username}:${db_password}@${db_host}:${db_port}/${db_name}`;
            resolve(
                mongo.connect(
                    uri, {
                        useCreateIndex: true,
                        useNewUrlParser: true,
                        useFindAndModify: false,
                        useUnifiedTopology: true,
                    },
                    (err) => {
                        if (err) {
                            throw new Error('Error connecting mongoose');
                        } else {
                            logger.info('Connection successfull');
                        }
                    },
                );
            )
        } catch (error) {
            reject(error)
        }
    }
    return {
        multi_tenant_db_connector
    }
}