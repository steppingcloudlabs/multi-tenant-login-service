const mongo = require('mongoose');
const logger = require('../logger')();

module.exports = () => {
    const multi_tenant_db_connector = (db_host, db_port, db_name, db_username, db_password, logger) => new Promise(async(resolve, reject) => {
        
        try {
            const uri = `mongodb://${db_username}:${db_password}@${db_host}:${db_port}/${db_name}`;
            // console.log(uri)
            db = mongo.connect(
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
            resolve(db)
        } catch (error) {
            reject(error)
        }
    })
    return {
        multi_tenant_db_connector
    }
}