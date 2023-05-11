//@
//@
//@
//@ file start





const express = require('express');
const router = express.Router();


const config_api = require('../../../configs/config');




const middle_ware =  require('../../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');






const controllers_admin_main =  
require(
	'../../../controllers/admin/main/controllers-admin-main.js'
);


router.get('/',	middle_ware, controllers_admin_main );











//@
//@
//@
//@ export
module.exports = router;
