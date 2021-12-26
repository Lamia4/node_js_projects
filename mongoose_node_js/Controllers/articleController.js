import Article from "../Model/Article.js";

export default {
    readAll: async function (req, res, next) {
        try {
            res.json(await Article.readAll());
        } catch (error) {
            next(error);
        }
    },

    readOne: async function (req, res, next) {
        if(checkToken)
        try {
            const article = await Article.readOne(req.params.articleId);
            if (!article) return res.status(404).send();
            res.json(article);
        } catch (error) {
            next(error);
        }
    },

    create: async function (req, res, next) {
        // npm i sanitize-html
        // sanitizeHtml(req.body.text);
        //Lorem ipsum
        try {
            res.json({ msg: "success" });
        } catch (error) {
            next(error);
        }
    },

    update: async function (req, res, next) {
        try {
            res.json({ msg: "success" });
        } catch (error) {
            next(error);
        }
    },

    delete: async function (req, res, next) {
        try {
            res.json({ msg: "success" });
        } catch (error) {
            next(error);
        }
    },
};



// import db from "../lib/database.js"

// const newDetails = async (rec, res) => {

//     const result = await db.collection("another_collection").insertOne({

//         name: "Zeynep",
//         email: "zeynep@gmail.com"
//     })
//     res.json(result)
// }

// export {newDetails}
