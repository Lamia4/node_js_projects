import User from "../models/User.js";
import getToken from "../lib/token.js";
import { json } from "express";

export default {
    loginByEmail: async function (req, res, next) {
        try {
            const { name, email, password } = req.body;
            const authenticatedUser = await User.authenticate(email, password);
            if(!authenticatedUser) return res.status(400).json({msg: "user is not authenticated"})
                const token = await getToken.createToken({id: authenticatedUser._id});
                const refreshToken = getToken.refreshToken({id :authenticatedUser._id});
                res.cookie("token", token, {
                    maxAge: 200 * 1000,
                    httpOnly: true,
                    path: "/user/token"
                });
                res.cookie("refreshToken", refreshToken, {
                    maxAge: 60 * 1000,
                    httpOnly: true,
                    path: "/user/refresh_token"
                })
                
                res.send({token, refreshToken, ...authenticatedUser._doc});
            
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    logout : async function (req, res) {
        try {
            res.clearCookie("refreshToken", {path: "/user/refresh_token"});
            return res.json({msg: "You are logged out"})
            
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getUser: async function (req, res){
        try {
            const user = await User.findById(req.user.name.id);
            if(!user) return res.status(400).json({msg: "User does not exist"})
            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

}