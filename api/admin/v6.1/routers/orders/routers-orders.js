//@
//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();


const config_api = require('../../configs/config');



const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');







//@
//@
//@
//@
//@ controller
const controllers_order_xac_nhan_don_hang =  
require(
	'../../controllers/orders/controllers-order-xac-nhan-don-hang-appdalacom.js'
);

const controllers_order_manage_show_all =  
require(
	'../../controllers/orders/controller-order-manage-show-all'
);

const controllers_order_manage_ajax_load =  
require(
	'../../controllers/orders/controller-order-manage-ajax-load'
);

const controllers_order_manage_ajax_load_detail =  
require(
	'../../controllers/orders/controller-order-manage-ajax-load-detail'
);


const controllers_order_manage_upload =  
require(
	'../../controllers/orders/controller-order-manage-update'
);











//@
//@
//@
//@
//@ router
router.get(
	'/show-all', middle_ware, controllers_order_manage_show_all
);

router.post(
	'/ajax-load', middle_ware, controllers_order_manage_ajax_load
);


router.post(
	'/ajax-load-detail', middle_ware, controllers_order_manage_ajax_load_detail
);


router.put(
	'/update', middle_ware, controllers_order_manage_upload
);







router.get(
	'/xac-nhan-don-hang',controllers_order_xac_nhan_don_hang
);

router.get('/', function(req, res, next) {
  res.end('api appdalacom orders welcom');
});










//@
//@
//@
//@
//@ export
module.exports = router;











//@
//@
//@
//@
//@ export