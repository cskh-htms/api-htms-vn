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
const controllers_admin_brand_update =  
require(
	'../../../controllers/admin/brands/controllers-admin-brand-update.js'
);





//@
//@
//@
//@ router
router.post('/update', middle_ware, controllers_admin_brand_update );








//@
//@
//@
//@ export
module.exports = router;