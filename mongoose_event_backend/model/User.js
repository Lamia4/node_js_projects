const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	// admin: {
	// 	type: Boolean,
	// 	required: true

	// }
}, { versionKey: false });

const User = mongoose.model("User", UserSchema);


async function login ({ username, password }) {
	const user = await User.findOne({ username });
	if (!user) throw new Error("user_not_found");

	const isPasswordCorrect = await bcrypt.compare(password.toString() + process.env.PEPPER, user.password);
	if (!isPasswordCorrect) throw new Error("password_incorrect");

	return { userId: user._id, name: user.fullName };
};

async function resetPassword ({ username, password}) {
	const user = await User.findOne({ username });
	if (!user) throw new Error("user_not_found");

	const SALT_ROUNDS = 12;
	console.log("before hash");
	const newBcrypt = bcrypt.hashSync(password.toString() + process.env.PEPPER, SALT_ROUNDS);
	console.log(newBcrypt);
	user.password = newBcrypt;
	console.log("before save");
	return await user.save();
	
}

module.exports = {
	login,
	resetPassword
};
