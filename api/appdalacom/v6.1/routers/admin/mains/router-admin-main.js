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

const controllers_admin_main_test_post =  
require(
	'../../../controllers/admin/main/controllers-admin-main-test-post.js'
);
const controllers_admin_main_test_get =  
require(
	'../../../controllers/admin/main/controllers-admin-main-test-get.js'
);







router.get('/',	middle_ware, controllers_admin_main );




router.post('/test-post',	middle_ware, controllers_admin_main_test_post );
router.get('/test-get',	middle_ware, controllers_admin_main_test_get );








//@
//@
//@
//@ export
module.exports = router;
