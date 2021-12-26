import express from "express";
import authenticationController from "../Controllers/authenticationController.js";
import csrf from "csurf";

const router = express.Router();

var csrfProtection = csrf(
	{ // Voreinstellungen stammen von csurf.
		cookie: {
			//key: '_csrf',
			//path: '/',
			//signed: false,
			//secure: false,
			//maxAge: null, // null => gültig für die gesamte Session
			//httpOnly: false, 
			sameSite: 'Lax', // false => "none"
			//domain: // default => current domain.
	  	} 
	}
);

router.get('/', csrfProtection, function (req, res) {
    // pass the csrfToken to the view
    res.render('login', { csrfToken: req.csrfToken() })
  });

router.post("/", authenticationController.loginByEmail);

export default router;