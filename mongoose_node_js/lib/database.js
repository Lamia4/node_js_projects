import dotenv from "dotenv";
// import mongodb from "mongodb";
import mongoose from "mongoose"

dotenv.config();

// const { MongoClient } = mongodb;

// const client = await MongoClient.connect(process.env.MongoDb_Url, {

//     useNewUrlParser: true,
//     useUnifiedTopology: true, 

// })



mongoose.connect(

    process.env.MongoDb_Url, {

        useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
		auth: { authSource: "admin" }
    }
)


// const db = client.db("Mongoose_Database");

const init = function () {

    const db = mongoose.connection;
    db.on("error", console.error);
}

export default {init};