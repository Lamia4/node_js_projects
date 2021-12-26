import User from "../Model/User.js";
import getToken from "../lib/token.js";

export default {
    loginByEmail: async function (req, res, next) {
        try {
            const authenticatedUser = await User.authenticate(req.body.email, req.body.password);
            if(authenticatedUser){
                const token = await getToken.createToken(req.body.name, req.body.email);
                console.log(token);
                res.send({token})
            }
            else {
                res.send("authentication failed")
            }
        } catch (error) {
            next(error);
        }
    },

}