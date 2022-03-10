const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    uuid: {type: String},
    dates: [{date: String, players: String, comment: String}],
}, {collection: 'calender'})


const DnDDates = mongoose.model('DnDDates', schema, 'calender');
module.exports = DnDDates;
