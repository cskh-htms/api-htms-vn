//@
//@
//@
//@ file start





const express = require('express');
const router = express.Router();
const config_api = require('../../../../../configs/config-api');

const middle_ware =  require('../../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');





//@
//@
//@
//@ controller
const controllers_admin_coupon_show_all =  
require(
	'../../../controllers/admin/coupons/controllers-admin-coupon-show-all'
);


//@
//@
//@
//@
//@ router
router.post('/show-all',middle_ware, controllers_admin_coupon_show_all);











//@
//@
//@
//@ export
module.exports = router;
