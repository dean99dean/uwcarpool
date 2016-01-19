var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var req = new Schema({
    id: Number,
    time: Date,
    from: String,
    to: String,
    inviter: String,
    description: String
});

module.exports = mongoose.model('req', req);
