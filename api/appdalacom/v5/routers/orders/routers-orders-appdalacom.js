

const express = require('express');
const router = express.Router();

const config_api = require('../../../../configs/config-api');

const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');

const controllers_order_xac_nhan_don_hang =  
require(
	'../../controllers/orders/controllers-order-xac-nhan-don-hang-appdalacom.js'
);


router.get('/', function(req, res, next) {
  res.end('api appdalacom orders welcom');
});



router.get(
	'/xac-nhan-don-hang',controllers_order_xac_nhan_don_hang
);



module.exports = router;
