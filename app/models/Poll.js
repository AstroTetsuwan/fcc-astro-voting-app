var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = require("./User.js");



var PollSchema = new mongoose.Schema({
    title: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    choices: [{choice: String, nbrVotes: Number}],
    creationDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Poll", PollSchema, "polls");