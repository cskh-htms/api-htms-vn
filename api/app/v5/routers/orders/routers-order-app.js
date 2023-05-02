//@
//@
//@
//@ 
const express = require('express');
const router = express.Router();


const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-app.js');





//@
//@
//@
//@ 
router.get('/', function(req, res, next) {
  res.end('App orders v5 welcom ');
});




//@
//@
//@
//@ 
const controllers_order_insert_app =  
	require('../../controllers/orders/controllers-order-insert-app.js');
const controllers_order_khach_hang_huy_don =  
	require('../../controllers/orders/controllers-order-khach-hang-huy-don-api-app.js');
const controllers_order_by_customer_app =  
	require('../../controllers/orders/controllers-order-by-customer-app.js');
const controllers_order_get_shipping_company_app =  
	require('../../controllers/orders/controllers-order-get-shipping-company-app.js');
const controllers_order_master_insert_app =  
	require('../../controllers/orders/controllers-order-master-insert-app.js');






//@
//@
//@
//@ 
router.get('/khach-hang-huy-don/:order_id', middle_ware,controllers_order_khach_hang_huy_don);
router.get('/by-customer', middle_ware,controllers_order_by_customer_app);
router.get('/get-shipping-company', middle_ware,controllers_order_get_shipping_company_app);


router.post('/insert', middle_ware,controllers_order_insert_app);
router.post('/master-insert', middle_ware,controllers_order_master_insert_app);



//@
//@
//@
//@ 
module.exports = router;
//@
//@
//@
//@ 