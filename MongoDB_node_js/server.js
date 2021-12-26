import dotenv from "dotenv";

import express from "express";
import db from "./lib/database.js";

import mongodb from "mongodb";

const { ObjectId } = mongodb;


dotenv.config();

const server = express();

server.listen(process.env.PORT, () => {

    console.log(`server is listening on ${process.env.PORT}` );

});

server.use(express.json());

server.use(express.urlencoded({ extended: true }));

server.get("/users", async (req, res) => {

    const users = await db.collection("users").find().toArray();

    // const users = await db.collection("users").find( { name: "Hatice" }).toArray();

    // const users = await db.collection("users").find().project( { email: false } ).toArray();

    res.json(users);
});

server.get("/users/:userId", async (req, res) => {

    const user = await db.collection("users").findOne( { _id: ObjectId(req.params.userId) });

    res.json(user);
});

server.get("/articles", async (req, res) => {

    const articles = await db.collection("article").find().toArray();

    // const users = await db.collection("users").find( { name: "Hatice" }).toArray();

    // const articles = await db.collection("users").find().project( { email: false } ).toArray();

    res.json(articles);
});

server.get("/users/:userId", async (req, res) => {

    const user = await db.collection("users").findOne( { _id: ObjectId(req.params.userId) });

    res.json(user);
});


server.get("/users/:userId/readinglist", async (req, res) => {

    const fusion = await db.collection("users").aggregate([       
    { 
        $match: 
            {
                _id : ObjectId( req.params.userId )
            }
    },
    {
        $lookup:
        {
            localField: "readinglist",
            from: "article",
            foreignField: "_id",
            as: "interestingArticles"
        }
    }
    ]).toArray();
    res.json(fusion);
});

server.post("/users", async (req, res) => {

    const newUser = await db.collection("users").insertOne( { 
        name: req.body.name, 
        email: req.body.email,
        address: req.body.address,
    });

    res.json(newUser);
});

server.put("/users/:userId", async (req, res) => {

    const updateUser = await db.collection("users").updateOne( { 
        _id: ObjectId( req.params.userId ) 
    }, 
    {
        $set: 
        {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            age: req.body.age
        }
    });
    res.json(updateUser);
});

server.delete("/users/:userId", async (req, res) => {

    const deleteUser = await db.collection("users").deleteOne( { 
        _id: ObjectId( req.params.userId ) 
    });
    res.json(deleteUser);
});

server.get("/commentars", async (req, res) => {

    const comments = await db.collection("commentars").find().toArray();
    res.json(comments);
})