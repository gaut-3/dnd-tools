const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String
})

const Role = mongoose.model('Role', schema);
module.exports = Role;
