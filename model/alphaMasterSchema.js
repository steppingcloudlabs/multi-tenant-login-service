const mongoose = require('mongoose');

const { Schema } = mongoose;
const Masterdata = mongoose.model('Masterdata', new Schema({}), 'masters');
module.exports = Masterdata;