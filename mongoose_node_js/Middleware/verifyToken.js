import validToken from "../lib/token.js";

const verifyToken = (req, res, next) => {
    validToken.checkToken(req.body.token);
    next();
};

export default verifyToken;