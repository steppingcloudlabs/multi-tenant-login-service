const mongoose = require('mongoose');

const { Schema } = mongoose;

const roleSchema = new Schema({
    role: { type: String, required: true },
    permission: [{ type: String }],
})

const role = mongoose.model('roles', roleSchema)
module.exports = role;