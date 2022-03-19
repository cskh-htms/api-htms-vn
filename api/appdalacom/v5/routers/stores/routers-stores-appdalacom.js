

const express = require('express');
const router = express.Router();

const config_api = require('../../../../configs/config-api');

const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');

const controllers_store_order_get_all =  
require(
	'../../controllers/stores/controllers-stores-order-get-all-api-appdalacom-api.js'
);


router.get('/', function(req, res, next) {
  res.end('api appdalacom stores welcom');
});



router.get(
	'/manage/orders/:store_id/:status_int',
	middle_ware, 
	controllers_store_order_get_all 
);



module.exports = router;
