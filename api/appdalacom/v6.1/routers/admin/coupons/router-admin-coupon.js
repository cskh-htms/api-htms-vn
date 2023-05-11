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
const controllers_admin_coupon_show_all =  
require(
	'../../../controllers/admin/coupons/controllers-admin-coupon-show-all'
);


const controllers_admin_coupon_show =  
require(
	'../../../controllers/admin/coupons/controllers-admin-coupon-show'
);


const controllers_admin_coupon_add =  
require(
	'../../../controllers/admin/coupons/controllers-admin-coupon-add'
);


const controllers_admin_coupon_save =  
require(
	'../../../controllers/admin/coupons/controllers-admin-coupon-save'
);


const controllers_admin_coupon_delete =  
require(
	'../../../controllers/admin/coupons/controllers-admin-coupon-delete'
);


const controllers_admin_coupon_update =  
require(
	'../../../controllers/admin/coupons/controllers-admin-coupon-update'
);






//@
//@
//@
//@
//@ router
router.get('/show-all',middle_ware, controllers_admin_coupon_show_all);
router.get('/show',middle_ware, controllers_admin_coupon_show);
router.get('/add',middle_ware, controllers_admin_coupon_add);
router.post('/save',middle_ware, controllers_admin_coupon_save);
router.delete('/delete',middle_ware, controllers_admin_coupon_delete);

router.put('/update',middle_ware, controllers_admin_coupon_update);





//@
//@
//@
//@ export
module.exports = router;
