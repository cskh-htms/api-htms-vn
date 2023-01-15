

//@
//@
//@
//@
//@  require
const express = require('express');
const router = express.Router();




const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');





//@
//@
//@
//@
//@  controller 
const controller_user_tracking_unlock  = 
require('../../controllers/' + 
ojs_configs.controller_version + 
'/users-tracking/controller-user-tracking-unlock.js');







//@
//@
//@
//@
//@  router admin
router.get('/unlock/:user_id',controller_user_tracking_unlock);


	
//@
//@
//@
//@
//@  router	
module.exports = router;
	
	
	

//@
//@
//@
//@
//@  router	