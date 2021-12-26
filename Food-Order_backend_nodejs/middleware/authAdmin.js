import User from "../models/User.js";

const authAdmin = async (req, res, next) => {

        try {
            console.log("body",req.body);
            
            const user = await User.findById({
                _id: req.body.userId
            })
            console.log("user", user);
            if(user.role === 0) return res.status(400).json({msg: "user is no admin"})
            next()
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }

};

export default authAdmin;