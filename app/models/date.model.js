const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    uuid: {type: String},
    name: {type: String},
    dates: [{date: String, players: [], comment: String}],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {collection: 'calender'})


const DnDDates = mongoose.model('DnDDates', schema, 'calender');
module.exports = DnDDates;
