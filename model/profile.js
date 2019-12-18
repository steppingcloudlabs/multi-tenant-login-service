const mongoose = require('mongoose');

const { Schema } = mongoose;

const profileSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'Login'
    }

})

const Profile = mongoose.model('Profiles', profileSchema)
module.exports = Profile;