var express = require('express');
var router = express.Router();
const Usercontroler = require('../controler/user')


/* GET home page. */

router.post('/signup', Usercontroler.Usersignup);

router.post('/login', Usercontroler.Userlogin);

router.get('/all', Usercontroler.SECURE, Usercontroler.Alluser);

router.get('/oneuser/:id', Usercontroler.Oneuser);

router.patch('/edit/:id', Usercontroler.Updateuser);

router.delete('/delete/:id', Usercontroler.Deleteuser);

module.exports = router;
