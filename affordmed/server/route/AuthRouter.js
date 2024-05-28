const express = require('express');
const router = express.Router();
const {login,signup,logout,admin}=require('./AuthController');
router.post('/login',login);
router.post('/signup',signup);
router.post('/logout', logout);
router.get('/admin', admin);
module.exports = router;