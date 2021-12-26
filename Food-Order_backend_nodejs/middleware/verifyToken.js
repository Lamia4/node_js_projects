import validToken from "../lib/token.js";

const verifyToken = (req, res, next) => {
    const correctToken = validToken.checkToken(req.body.token);
    // try catch fehler abfangen und dann if(!correctToken) return res.status(401).json({msg: "please login or register"});
    //const newToken = //neuen Token erstellen über createToken
    //res.cookie(....neuenToken)
    console.log(correctToken, "show correctToken");
    // if(correctToken){
    //     res.send(true) res.status(200)
    // }
    next();
};

export default verifyToken