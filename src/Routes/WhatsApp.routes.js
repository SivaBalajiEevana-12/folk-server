const {register,registerEvent}=require('../Controllers/Whatsapp.Controller');
const express = require('express');
const router = express.Router();
router.post('/register',register);
router.post('/registerEvent',registerEvent);
module.exports =router;
