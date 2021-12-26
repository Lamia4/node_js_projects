import mongoose from "mongoose";
import bcrypt from "bcrypt";

const ReadingListItemSchema = mongoose.Schema({
    articleId: {
		type: String,
		required: true,
	},
	read: {
		type: Number,
		default: 0,
	},
}, { _id: false });

const UserSchema = mongoose.Schema({
    name:  {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
		type: String,
		required: true
	},
    readingList: [ReadingListItemSchema],
}, { versionKey: false });

const User = mongoose.model("User", UserSchema);

async function emailExist (emailP) {
	return await User.exists({ email: emailP })
}

async function addArticleToReadingList (userId, articleId) {
	// Zuerst suchen wir den User und werfen einen Fehler, falls kein Datensatz gefunden werden kann.
	const user = await User.findById(userId);
	if (!user) throw new Error("user not found");

	// Anschließend fügen wir ein neues Objekt an die readingList an. Da "user" ein JavaScript Object ist, können wir alle Techniken und Funktionen nutzen, um die Daten zu verändern.
	// In diesem Fall nutzen wir .push(), um das Objekt hinzuzufügen.
	// Die read-Flag müssen wir nicht explizit setzen, da wir im Schema definiert haben, dass es den Standardwert 0 erhalten soll.
	// Mongoose wird "read" also automatisch mit dem Wert 0 ins Objekt schreiben.
	user.readingList.push({ articleId });

	// Speichern nicht vergessen, damit der aktualisierte Datensatz in der Datenbank landet.
	return await user.save();
};

async function deleteById(id){
	return await User.findByIdAndDelete(id);
}

async function markArticleAsRead (userId, articleId) {
	const user = await User.findById(userId);
	if (!user) throw new Error("user not found");

	const position = user.readingList.findIndex(article => article.articleId === articleId);
	if (position === -1) throw new Error("article not found");

	user.readingList[position].read = 1;

	return await user.save();
};

async function readAll () {
	return await User.find();
};

async function readOne (id) {
	return await User.findById(id);
};

async function updateById(id, userObject){
	return await User.findByIdAndUpdate(
		id, 
		userObject, 
		{new: true, runValidators: true}
	);
}

async function updateCredentials (email, password) {
	return null;
}

// async function createUser (req, res, next) {
//     console.log("************************", req.body);
// 	const user = new User({
// 		name: req.body.name,
// 		email: req.body.email,
//         password: req.body.password,
// 	});

// 	const result =  await user.save();
//     res.json(result)
// }
async function authenticate (email, password) {

	const findUser = await User.findOne({ email: email });
	
	if(!findUser) throw new Error("User not found");

	const isAuthenticated = bcrypt.compareSync(password, findUser.password);

	if(!isAuthenticated) throw new Error("password incorrect");
	
	return findUser;

};

// try {
//     authenticate();
// } catch (error) {
// 	console.log(error);
// }


async function createUser (nameP, emailP, passwordP) {
	const SALT_ROUNDS = 12;
	console.log("before hash");www.youtube.de
	const newBcrypt = bcrypt.hashSync(passwordP, SALT_ROUNDS);
	console.log(newBcrypt);
	const user = new User({
		name: nameP,
		email: emailP,
        password: newBcrypt,
	});
	console.log("before save");
	return await user.save();
}

export default { 
    createUser, 
    addArticleToReadingList, 
    deleteById, 
    markArticleAsRead, 
    readAll, 
    readOne, 
    updateById, 
    updateCredentials,
	emailExist,
	authenticate 
};
