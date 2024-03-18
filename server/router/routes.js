const express = require('express')
const router = express.Router();

const userController = require('../controllers/userController');
const Auth = require('../middleware/auth');

// POST methods

router.post('/register', userController.register);
router.post('/login', userController.verifyUser, userController.login)
router.post('/authenticate', (req, res) => res.end())
router.get('/user/:username', userController.getUser)


// router.route('/createResetSession').get(controller.createResetSession);

module.exports = router  ;