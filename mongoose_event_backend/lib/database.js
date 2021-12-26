const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

mongoose.connect(
	process.env.MONGODB_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
		auth: { authSource: "admin" }
	}
);

const init = function () {
	const db = mongoose.connection;
	db.on("error", console.error);
}

module.exports = { init };
