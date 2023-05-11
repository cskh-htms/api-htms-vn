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
const controllers_admin_discount_program_show_all =  
require(
	'../../../controllers/admin/discount-programs/controllers-admin-discount-program-show-all.js'
);

const controllers_admin_discount_show =  
require(
	'../../../controllers/admin/discount-programs/controllers-admin-discount-program-show'
);

const controllers_admin_discount_update =  
require(
	'../../../controllers/admin/discount-programs/controllers-admin-discount-program-update'
);

const controllers_admin_discount_program_add =  
require(
	'../../../controllers/admin/discount-programs/controllers-admin-discount-program-add'
);

const controllers_admin_discount_program_save =  
require(
	'../../../controllers/admin/discount-programs/controllers-admin-discount-program-save'
);


const controllers_admin_discount_program_delete =  
require(
	'../../../controllers/admin/discount-programs/controllers-admin-discount-program-delete'
);


const controllers_admin_discount_program_product_delete =  
require(
	'../../../controllers/admin/discount-programs/controllers-admin-discount-program-product-delete'
);


const controllers_admin_discount_program_product_add =  
require(
	'../../../controllers/admin/discount-programs/controllers-admin-discount-program-product-add'
);

const controllers_admin_discount_program_product_denied =  
require(
	'../../../controllers/admin/discount-programs/controllers-admin-discount-program-product-denied'
);

const controllers_admin_discount_program_view_discount =  
require(
	'../../../controllers/admin/discount-programs/controllers-admin-discount-program-view-discount'
);

const controllers_admin_discount_program_view_product =  
require(
	'../../../controllers/admin/discount-programs/controllers-admin-discount-program-view-product'
);





//@
//@
//@
//@
//@ controller
router.get('/show-all',	middle_ware, controllers_admin_discount_program_show_all );
router.get('/show',	middle_ware, controllers_admin_discount_show );
router.put('/update',	middle_ware, controllers_admin_discount_update );
router.get('/add',	middle_ware, controllers_admin_discount_program_add );
router.post('/save',	middle_ware, controllers_admin_discount_program_save );
router.delete('/delete',	middle_ware, controllers_admin_discount_program_delete );
router.delete('/product-delete',	middle_ware, controllers_admin_discount_program_product_delete );
router.put('/product-add',	middle_ware, controllers_admin_discount_program_product_add );
router.put('/product-denied',	middle_ware, controllers_admin_discount_program_product_denied );
router.get('/view-discount',	middle_ware, controllers_admin_discount_program_view_discount );

router.get('/view-product',	middle_ware, controllers_admin_discount_program_view_product );




















/*


const controllers_admin_discount_program_product_add =  
require(
	'../../../controllers/admin/discount-programs/controllers-admin-discount-program-product-add'
);

const controllers_admin_discount_program_product_denied =  
require(
	'../../../controllers/admin/discount-programs/controllers-admin-discount-program-product-denied'
);







router.get('/product-add',	middle_ware, controllers_admin_discount_program_product_add );
router.post('/product-denied',	middle_ware, controllers_admin_discount_program_product_denied );








*/










//@
//@
//@
//@ export
module.exports = router;
