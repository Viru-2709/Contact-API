var express = require('express');
const Contactcontroler = require('../controller/contact')
var router = express.Router();
/* GET home page. */

// AllContact
router.get('/all',Contactcontroler.SECURE ,  Contactcontroler.AllContact);

//Addcontact
router.post('/add',Contactcontroler.SECURE ,Contactcontroler.Addcontact);

//Upedatacontact
router.patch('/edit/:id', Contactcontroler.Upedatecontact);

// Deletecontact
router.delete('/delete/:id', Contactcontroler.Deletecontact);

module.exports = router;
