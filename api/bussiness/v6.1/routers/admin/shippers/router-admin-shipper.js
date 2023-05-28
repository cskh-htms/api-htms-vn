//@
//@
//@
//@ file start





const express = require('express');
const router = express.Router();


const config_api = require('../../../configs/config');




const middle_ware =  require('../../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');




//@
//@
//@
//@ controller
const controller_admin_shipper_show_all =  
require(
	'../../../controllers/admin/shippers/controller-admin-shipper-show-all.js'
);



//@
//@
//@
//@ router
router.get('/show-all/', middle_ware, controller_admin_shipper_show_all );












//@
//@
//@
//@ export
module.exports = router;
