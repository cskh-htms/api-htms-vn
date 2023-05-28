

//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();
const config_api = require('../../configs/config');





const controller_traffic_appdalacom =  
	require('../../controllers/traffics/controller-traffic-appdalacom.js');


//@
//@
//@
router.get('/', function(req, res, next) {
  res.end('App dala welcom ');
});



//@
//@
//@
router.post('/',controller_traffic_appdalacom);





module.exports = router;
