const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
SALT_WORK_FACTOR = require("../config")["salt_work_factor"];

const { Schema } = mongoose;

const loginSchema = new Schema({
    user_id: {
        type: String,
        unique: "true",
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    subscribed_service: [{ type: String, required: true }],

    role: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'role'
    }
},
    {
        timestamps: true
    }
);

//Hash the password before saving it
loginSchema.pre("save", function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();

    // generate a salt
    bcrypt.genSalt(parseInt(SALT_WORK_FACTOR), function (err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

const Login = mongoose.model("login", loginSchema);
module.exports = Login;