var express = require('express');
var router = express.Router();
const Admincontroler = require('../controler/admin')


/* GET home page. */
router.post('/signup', Admincontroler.Adminsignup);

router.post('/login', Admincontroler.Adminlogin);

module.exports = router;
