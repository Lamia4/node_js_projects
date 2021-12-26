import mongoose from "mongoose";
import bcrypt from "bcrypt";

// const OrderListItemSchema = mongoose.Schema({
//     foodId: {
// 		type: String,
// 		required: true,
// 	},
// 	title: {
// 		type: String,
// 	},
//     description: {
// 		type: String,
// 	},
//     img: {
// 		type: String,
// 	},
//     price: {
// 		type: Number,
// 		default: 0,
// 	},
//     count: {
//         type: Number,
//         default: 0,
//     }
// }, { _id: false });

const UserSchema = new mongoose.Schema({
    name:  {
        type: String,
        required: true,
		trim: true
    },
	surname:  {
        type: String,
        required: true,
		trim: true
    },
	street:  {
        type: String,
		required: true,
		trim: true
	},
	postalCode:  {
        type: Number,
		required: true,
		trim: true
	},
	city:  {
        type: String,
		required: true,
		trim: true
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
	role: {
		type: Number,
		default: 0
	},
	cart: {
		type: Array,
		default: []
	}
},
{
	timestamps: true
});

const User = mongoose.model("User", UserSchema);

async function register (name, surname, street, postalCode, city, email, password) {
	const SALT_ROUNDS = 12;
	console.log("before hash");
	const newBcrypt = bcrypt.hashSync(password, SALT_ROUNDS);
	console.log(newBcrypt);
	const user = new User({
		name,
		surname,
		street,
		postalCode,
		city,
		email,
        password: newBcrypt,
	});
	console.log("before save");
	return await user.save();
}

async function authenticate (email, password) {

	const findUser = await User.findOne({ email: email });
	
	if(!findUser) throw new Error("User not found");

	const isAuthenticated = bcrypt.compareSync(password, findUser.password);

	if(!isAuthenticated) throw new Error("password incorrect");
	
	return findUser;

};

async function emailExist (emailP) {
	return await User.exists({ email: emailP })
}

async function addFoodToOrderList (foodId) {
	const user = await User.findById(foodId);
	if (!user) throw new Error("user not found");
	user.orderList.push({ foodId });
	return await user.save();
};

async function deleteById(id){
	return await User.findByIdAndDelete(id);
}

async function readOne (id) {
	return await User.findById(id);
};

async function findById (id) {
	return await User.findById(id);
};

async function updateById(id, userObject){
	return await User.findByIdAndUpdate(
		id, 
		userObject, 
		{new: true, runValidators: true}
	);
}






// try {
//     authenticate();
// } catch (error) {
// 	console.log(error);
// }




export default { 
    register, 
    addFoodToOrderList, 
    deleteById,
    readOne, 
    updateById,
	emailExist,
	authenticate ,
	findById
};
