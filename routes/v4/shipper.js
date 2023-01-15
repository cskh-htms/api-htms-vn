//@
//@
//@
//@
//@

//@
//@
//@ loader function shares
const express = require('express');
const router = express.Router();


const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');




//@
//@
//@
//@
//@ controller
const controller_admin_shipper_show_all = require('../../controllers/' + 
ojs_configs.controller_version + 
'/admin/shippers/controller-shipper-show-all'
);





//@
//@
//@
//@
//@ router
router.get('/:shipper_id', controller_admin_shipper_show_all);






	
//@
//@
//@
//@
//@ router	
module.exports = router;
	
	
	

//@
//@
//@
//@
//@ end