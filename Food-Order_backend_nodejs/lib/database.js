import dotenv from "dotenv";

import mongoose from "mongoose";

dotenv.config();

mongoose.connect(

    process.env.MongoDb_Url, {

        useNewUrlParser: true,
		useUnifiedTopology: true,

    }
)

const init = function () {

    const db = mongoose.connection;
    db.on("error", console.error);
}

export default {init};