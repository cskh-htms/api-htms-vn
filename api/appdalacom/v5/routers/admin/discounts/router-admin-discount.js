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
const controllers_admin_discount_program_add =  
require(
	'../../../controllers/admin/discount-programs/controllers-admin-discount-program-add'
);

const controllers_admin_discount_program_show_all =  
require(
	'../../../controllers/admin/discount-programs/controllers-admin-discount-program-show-all.js'
);

const controllers_admin_discount_program_product_add =  
require(
	'../../../controllers/admin/discount-programs/controllers-admin-discount-program-product-add'
);

const controllers_admin_discount_program_product_denied =  
require(
	'../../../controllers/admin/discount-programs/controllers-admin-discount-program-product-denied'
);





//@
//@
//@
//@
//@ discount
router.get('/add',	middle_ware, controllers_admin_discount_program_add );
router.get('/show-all',	middle_ware, controllers_admin_discount_program_show_all );
router.get('/product-add',	middle_ware, controllers_admin_discount_program_product_add );
router.post('/product-denied',	middle_ware, controllers_admin_discount_program_product_denied );











//@
//@
//@
//@ export
module.exports = router;
