const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    email: String,
    password: String,
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
})


const User = mongoose.model('User', schema);
module.exports = User;
