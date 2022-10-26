const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const auth = require('../middlewares/auth');

// Rota post responsavel por criar um novo usuario, POST, 'localhost:3000/teste/register'
router.post('/register', userController.registerNewUser);

// 
router.post('/login', userController.loginUser);


router.get('/authlogin', auth, userController.userProfile);

module.exports = router;