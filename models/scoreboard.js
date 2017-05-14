//scores data to be kept in MongoDB
//mongoose to define schema
var mongoose = require("mongoose");

//rough schema
var scoreboardSchema = mongoose.Schema({
	pastScores : [String]
});

//A method to get the scoreboard id in the database
scoreboardSchema.methods.getid = function() {
	return this._id;
};


scoreboardSchema.methods.placeBefore = function(what, where) {
	for (var i = 0; i < this.pastScores.length; i++) {
		if (this.pastScores[i] == where) {
			this.pastScores.splice(i-1, 0, what);
			break;
		}
	}
}

var ScoreBoard = mongoose.model("ScoreBoard", scoreboardSchema);

//export the model to make it available for use
module.exports = ScoreBoard;