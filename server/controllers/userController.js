const User = require('../models/User');
const bcrypt = require('bcrypt');
const ENV = require("../config");
const jwt = require('jsonwebtoken')

// middleware for verifying user

const verifyUser = async (req, res, next) => {
  try{
    const {username} = req.method == 'GET' ? req.query : req.body;

    let loggedIn = await User.findOne({ username });
    if(!loggedIn) return res.status(404).send("User not found...");
    next();
  }catch(error){
    return res.status(404).send("Authentication failed...")
  }
}

const register = async (req, res) => {

  const { username, password, email, profile } = req.body;
  try {

    // Simple validation
    if (!username || !password || !email) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      profile: profile || ""
    });

    // Save user
    await newUser.save();

    return res.status(201).json({ msg: 'User created successfully', userId: newUser.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    User.findOne({ username })
      .then(user => {
        bcrypt.compare(password, user.password)
          .then(checkPass => {
            if (!checkPass) {
              return res.status(500).json({ message: "No password entered..." })
            } else {

              // create jwt token
              const token = jwt.sign({
                userId : user._id,
                username: user.username
              }, ENV.JWT_SECRET, { expiresIn: "24h"});

                  return res.status(200).send({
                    message: "login successful...",
                    userId : user._id,
                    username: user.username ,
                    token
                  });
              }
          })
          .catch(error => {
            res.status(400).json({ message: "Password doesn't match..." })
          })
      })
      .catch(error => {
        return res.status(404).json({ message: "User not found..." })
      })
  } catch (e) {
    return res.status(500).json({ error: error.message });
  }
}


const getUser = async (req, res) => {
  const { username } = req.params ;
  try {
      if(!username) return res.status(400).send("Invalid username...");

      const user = await User.findOne({ username })
        if(!user) return res.status(404).send("Cannot find user...");

        const {password, ...rest} = Object.assign({}, user.toJSON())

        return res.status(200).send(rest);
      

  } catch (e) {
    return res.status(404).send("Cannot find user...");
  }
}


// export async function updateUser(req, res) {
//   try {

//   } catch (e) {
//     return res.status(500).send(e);
//   }
// }


// export async function generateOTP(req, res) {
//   try {

//   } catch (e) {
//     return res.status(500).send(e);
//   }
// }


// export async function verifyOTP(req, res) {
//   try {

//   } catch (e) {
//     return res.status(500).send(e);
//   }
// }


// export async function createResetSession(req, res) {
//   try {

//   } catch (e) {
//     return res.status(500).send(e);
//   }
// }


exports.verifyUser = verifyUser;
exports.register = register;
exports.login = login;
exports.getUser = getUser ;
