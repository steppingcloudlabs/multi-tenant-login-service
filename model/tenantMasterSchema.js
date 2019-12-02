const mongoose = require('mongoose');

const { Schema } = mongoose;
const Masterdata = mongoose.model('Masterdata', new Schema({}), 'masterdata');
module.exports = Masterdata;