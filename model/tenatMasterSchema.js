const mongoose = require('mongoose');

const { Schema } = mongoose;
const TenantMasterdata = mongoose.model('TenantMasterdata', new Schema({}), 'masterdata');
module.exports = TenantMasterdata;