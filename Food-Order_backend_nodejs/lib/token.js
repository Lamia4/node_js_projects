import jwt from "jsonwebtoken";


export default { 
    createToken: function (name, email) {

    // const { name, email } = req.body;

        const user = {name, email};

        const secret = process.env.SECRET;
    
        const options = {
            algorithm: "HS256",
            expiresIn: "500s"
        };
    
        const token = jwt.sign(user, secret, options);



    return token
},

checkToken: function (user) {

    return jwt.verify(user, process.env.SECRET, { algorithm: ["HS256"]}, (error, payload) => {
        if(error) throw new Error ("invalid token");

        return payload;
    })

},

refreshToken: function (user) {

    return jwt.sign(user, process.env.SECRET, { algorithm: "HS256",
    expiresIn: "60s"} )
},

// checkRefreshToken: function (user) {
//     return jwt.verify(user, process.env.REFRESH_TOKEN_SECRET, { algorithm: ["HS256"]}, (error, payload) => {

//         return payload;
//     })
// }

}