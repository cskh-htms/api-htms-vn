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

const controllers_admin_thong_ke_save =  
require(
	'../../../controllers/admin/thong-ke/controllers-admin-thong-ke-save.js'
);

const controllers_admin_thong_ke_marketing =  
require(
	'../../../controllers/admin/thong-ke/controllers-admin-thong-ke-marketing.js'
);



router.get('/get-all',	middle_ware, controllers_admin_thong_ke );
router.post('/save',	middle_ware, controllers_admin_thong_ke_save );
router.get('/marketing',	middle_ware, controllers_admin_thong_ke_marketing );









//@
//@
//@
//@ export
module.exports = router;
