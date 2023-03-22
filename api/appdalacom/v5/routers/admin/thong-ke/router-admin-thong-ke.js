//@
//@
//@
//@ file start





const express = require('express');
const router = express.Router();
const config_api = require('../../../../../configs/config-api');

const middle_ware =  require('../../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');






const controllers_admin_thong_ke =  
require(
	'../../../controllers/admin/thong-ke/controllers-admin-thong-ke.js'
);


router.get('/get-all',	middle_ware, controllers_admin_thong_ke );











//@
//@
//@
//@ export
module.exports = router;
