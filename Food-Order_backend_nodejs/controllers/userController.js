import User from "../models/User.js";
import getToken from "../lib/token.js";

export default {

    readOne: async function (req, res, next) {
        try {
            const user = await User.readOne(req.params.userId);
            if (!user) return res.status(404).send();
            res.json(user);
        } catch (error) {
            next(error);
        }
    },

    register: async function (req, res, next) {
        try {
            const { name, surname, street, postalCode, city, email, password } = req.body;
            const user2 = await User.emailExist(email)
            if(user2) return res.status(400).json({msg: "the email already exist"});
            if(password.length < 6) return res.status(400).json({msg: "password must be at least 6 characters"})
            const user = await User.register(
                name,
                surname,
                street,
                postalCode,
                city,
                email,
                password,
            );
            const accessToken = getToken.createToken({id :user._id});
            const refreshToken = getToken.refreshToken({id :user._id});

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                path: "user/refresh_token"
            })
            res.json({token: accessToken, user: user});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    refreshToken: async (req, res) => {
        const refresh_token = req.cookies.refreshToken;
        if(!refresh_token) return res.status(400).json({msg: "please login or register!"});
        res.json({refresh_token})
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

    addFoodToOrderList: async function (req, res, next) {
        try {
            const result = await User.addFoodToOrderList(req.params.userId, req.body.foodId);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

};