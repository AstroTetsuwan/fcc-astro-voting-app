var mongoose = require("mongoose");


var PollSchema = new mongoose.Schema({
    title: String,
    authorId: String,
    choices: [{choice: String, nbrVotes: Number}],
    creationDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Poll", PollSchema);