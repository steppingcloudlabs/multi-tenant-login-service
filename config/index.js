module.exports = {
    // server config
    port: process.env.NODE_PORT,
    name: 'alpha',
    env: process.env.NODE_ENV,
    base_uri: process.env.BASE_URI,
    host: process.env.HOST,

    // mongodb config
    isMongoUri: false,
    mongo_host: process.env.MONGO_HOST,
    mongo_port: process.env.MONGO_PORT,
    mongo_dbname: process.env.MONGO_DBNAME,
    mongo_uri: process.env.MONGO_URI,

    // jwt config
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    salt_work_factor: process.env.SALT_WORK_FACTOR,

    // aws-sdk config
    aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
    aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
    aws_region: process.env.AWS_REGION,

    // Tenant mongo config
    db_host: process.env.TENANT_HOST,
    db_port: process.env.TENANT_PORT
};