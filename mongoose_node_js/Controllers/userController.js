import User from "../Model/User.js";

export default {
    readAll: async function (req, res, next) {
        try {
            const users = await User.readAll();
            res.json(users);
        } catch (error) {
            next(error);
        }
    },

    readOne: async function (req, res, next) {
        try {
            const user = await User.readOne(req.params.userId);
            if (!user) return res.status(404).send();
            res.json(user);
        } catch (error) {
            next(error);
        }
    },

    create: async function (req, res, next) {
        // console.log("userController.create");
        try {
            // const resultT = Validation(req.body);
            // console.log(resultT);
            // if(resultT){
            if(await User.emailExist(req.body.email)){

                const err = new Error("user already exists");
                err.type = "exists";
                throw err;
            }
            const result = await User.createUser(
                req.body.name,
                req.body.email,
                req.body.password
            );
            res.json(result);
            // } else {
            //     console.log("validation false");
            // }
        } catch (error) {
            next(error);
        }
    },

    update: async function (req, res, next) {
        try {
            const id = req.params.userId;
            const updatedUser = req.body;
            const result = await User.updateById(id, updatedUser);
            res.json(result);
        } catch (error) {
            next(error);
        }
    },

    delete: async function (req, res, next) {
        try {
            const result = await User.deleteById(req.params.userId);
            res.json(result);
        } catch (error) {
            next(error);
        }
    },

    // Neue Controller Functions für die Reading List
    addArticleToReadingList: async function (req, res, next) {
        try {
            const result = await User.addArticleToReadingList(req.params.userId, req.body.articleId);
            res.json(result);
        } catch (error) {
            next(error);
        }
    },

    markArticleAsRead: async function (req, res, next) {
        try {
            const result = await User.markArticleAsRead(req.params.userId, req.params.articleId);
            res.json(result);
        } catch (error) {
            next(error);
        }
    },
};


// import db from "../lib/database.js";



// const getUserById = async function (req, res) {

//     const user = await db.collection("new_collection").findOne({ name: req.params.name })
//     res.json(user);
// };



// async function createUser (name, email) {

//     const user = new User ({

//         name,
//         email,
//         password
//     })    
//     await user.save(function(err, user){
//         if (err) return console.error(err, 'user:', user, 'could not be saved');
//         console.log('user saved');
//         }) 
// };

// export {getUserById}