const jwt = require('jsonwebtoken');
const ENV = require('../config');
const User = require('../models/User');  // new

async function Auth(req, res, next) {
    try {
        window.alert("Auth")
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET)
        req.user = decodedToken;
        console.log("Decoded Token:-------------", decodedToken)
        console.log("Request.user-----------", req.user)
        
        const userlog = await User.findById(decodedToken._id);
        console.log("User log-----------", userlog)

        if (!userlog) {
            throw new Error('User not found');
        }

        req.userlog = userlog ;
        next();
        // res.json(decodedToken, userlog);
    } catch (e) {
        res.status(401).json({ msg: "Authentication failed..." })
    }
}

exports.Auth = Auth;