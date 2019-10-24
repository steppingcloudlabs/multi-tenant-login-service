const AWS = require('aws-sdk');
const config = require('./config');

const options = {
  accessKeyId: config.aws_access_key_id,
  secretAccessKey: config.aws_secret_access_key,
  region: config.aws_region,
};

AWS.config.update(options);

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
});

module.exports = {
  AWS,
  s3,
};
