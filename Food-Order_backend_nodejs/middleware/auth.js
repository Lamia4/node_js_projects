import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization
        if(!token) return res.status(400).json({msg: "invalid Authentication"})
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if(err) return res.status(400).json({msg: "invalid Authentication"})
            req.user = user;
            next();
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
};

export default auth