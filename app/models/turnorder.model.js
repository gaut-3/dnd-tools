const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    turnOrders: [
        {
            uuid: {type: String},
            name: {type: String},
            turnOrder: [{
                id: {type: String},
                name: {type: String},
                initiative: {type: Number},
                ac: {type: String},
                hp: {type: String},
                comment: {type: String},
                description: {type: String},
                isPlayer: {type: String},
            }]
        }
    ]
})

const Turnorders = mongoose.model('Turnorders', schema, 'turnorders');
module.exports = Turnorders;
