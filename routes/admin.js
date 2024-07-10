var express = require('express');
var router = express.Router();
const Admincontroler = require('../controller/admin')


/* GET home page. */
router.post('/signup', Admincontroler.Adminsignup);

router.post('/login', Admincontroler.Adminlogin);

module.exports = router;
