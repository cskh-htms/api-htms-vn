
//@
//@
//@
//@ file start




//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();





//@
//@
//@
//@ config
const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');









//@
//@
//@
//@ controller 
const controller_coupon_manage_show_all =  
require(
	'../../controllers/coupons/controller-coupon-manage-show-all.js'
);

const controller_coupon_manage_add =  
require(
	'../../controllers/coupons/controller-coupon-manage-add.js'
);

const controller_coupon_manage_save =  
require(
	'../../controllers/coupons/controller-coupon-manage-save.js'
);


const controller_coupon_manage_delete =  
require(
	'../../controllers/coupons/controller-coupon-manage-delete.js'
);


const controller_coupon_manage_show =  
require(
	'../../controllers/coupons/controller-coupon-manage-show.js'
);

const controller_coupon_manage_update =  
require(
	'../../controllers/coupons/controller-coupon-manage-update.js'
);





//@
//@
//@
//@ router
router.get('/show-all/',middle_ware, controller_coupon_manage_show_all );
router.get('/add/',middle_ware, controller_coupon_manage_add );
router.post('/save/',middle_ware, controller_coupon_manage_save );
router.delete('/delete/',middle_ware, controller_coupon_manage_delete );

router.get('/show/',middle_ware, controller_coupon_manage_show );
router.put('/update/',middle_ware, controller_coupon_manage_update );





//@
//@
//@
//@ export
module.exports = router;





//@
//@
//@
//@ file end




