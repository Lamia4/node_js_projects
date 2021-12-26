import express from "express";
import userController from "../Controllers/userController.js";
import Validation from "../Middleware/Validation.js";
import TokenHandler from "../lib/token.js"

import postSchema from "../Validation/users.post.js";



import csrf from 'csurf';


const router = express.Router();

const debugResponse = (req, res, next) => {

    console.log(req.body);; // der hält es dann erstmal auf an der stelle, damit man zum Beispiel noch kein user erstellt und nur das Schema prüft und noch keine Verbindung zur Datenbank nötig ist
    next();
}

// router.get("/:name", getUserById);



// var parseForm = express.urlencoded({ extended: false })

// var csrfProtection = csrf(
//     { // Voreinstellungen stammen von csurf.
//         cookie: {
//             //key: '_csrf',
//             //path: '/',
//             //signed: false,
//             //secure: false,
//             //maxAge: null, // null => gültig für die gesamte Session
//             //httpOnly: false, 
//             sameSite: 'Lax', // false => "none"
//             //domain: // default => current domain.
//           } 
//     }
// );

router.post("/", Validation(postSchema), debugResponse, userController.create );

// router.get('/createuserform', csrfProtection, function (req, res) {
//     // pass the csrfToken to the view
//     res.render('users', { csrfToken: req.csrfToken() })
//   });

// router.post("/",Validation(postSchema), userController.create);
// router.get("/", (req, res, next) => {

//     res.send(req)
// })


router.post("/:userId/readingList", userController.addArticleToReadingList);
router.post("/:userId/readingList/:articleId", userController.markArticleAsRead);

export default router