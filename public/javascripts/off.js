var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var off = new Schema({
    id: Number,
    time: Date,
    from: String,
    to: String,
    inviter: String,
    description: String
});

module.exports = mongoose.model('off', off);
