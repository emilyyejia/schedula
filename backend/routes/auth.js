const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');

// All paths start with '/api/auth'

// POST /api/auth/signup
router.post('/signup', authCtrl.signUp);
router.post('/login', authCtrl.logIn);
router.post('/googlelogin', authCtrl.googleLogIn);
router.get('/checkuser', authCtrl.checkUser);

module.exports = router;