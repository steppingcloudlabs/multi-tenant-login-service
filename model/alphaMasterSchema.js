const mongoose = require('mongoose');


const { Schema } = mongoose;
const Masters = mongoose.model('Masters', new Schema({}), 'masters');
module.exports = Masters;