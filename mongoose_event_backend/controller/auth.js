const tokenHandler = require("../lib/token.js");
const UserModel = require("../model/User.js");

module.exports = {
    login: async (req, res, next) => {
        try {
            const user = await UserModel.login({
                username: req.body.username,
                password: req.body.password,
            });

            const token = tokenHandler.create(user);
            console.log("token", token);

            res.cookie("token", token, {
                maxAge: process.env.TOKEN_EXP * 1000,
                httpOnly: true,
            });

            res.json(user);
        } catch (error) {
            res.status(401).send();
            next(error);
        }
    },
    resetPassword: async (req, res, next) => {
        try {
            const user = await UserModel.resetPassword({
                username: req.body.username,
                password: req.body.password
            
            });

            res.json(user);
        } catch (error) {
            res.status(401).send();
            next(error);
        }
    }
};
