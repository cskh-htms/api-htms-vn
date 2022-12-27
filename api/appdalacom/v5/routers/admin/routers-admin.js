//@
//@
//@
//@ file start





const express = require('express');
const router = express.Router();
const config_api = require('../../../../configs/config-api');

const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');





//@
//@
//@
//@ stores
const controllers_admin_store_add =  
require(
	'../../controllers/admin/stores/controllers-admin-stores-add'
);

const controllers_admin_store_save =  
require(
	'../../controllers/admin/stores/controllers-admin-stores-save'
);






//@
const controllers_admin_discount_program_add =  
require(
	'../../controllers/admin/discount-programs/controllers-admin-discount-program-add'
);


//@
const controllers_admin_discount_program_show_all =  
require(
	'../../controllers/admin/discount-programs/controllers-admin-discount-program-show-all.js'
);

//@
const controllers_admin_discount_program_product_add =  
require(
	'../../controllers/admin/discount-programs/controllers-admin-discount-program-product-add'
);

//@
const controllers_admin_discount_program_product_denied =  
require(
	'../../controllers/admin/discount-programs/controllers-admin-discount-program-product-denied'
);





const controllers_admin_coupon_show_all =  
require(
	'../../controllers/admin/coupons/controllers-admin-coupon-show-all'
);


const controllers_admin_main =  
require(
	'../../controllers/admin/main/controllers-admin-main.js'
);






//@
//@
//@ brands
const controllers_admin_brand_update =  
require(
	'../../controllers/admin/brands/controllers-admin-brand-update.js'
);











//@
//@
//@
//@ welcom
router.get('/', function(req, res, next) {
  res.end('api appdalacom admin welcom');
});





//@
//@
//@
//@ stores
router.get('/store-add',	middle_ware, controllers_admin_store_add );
router.post('/store-save',	middle_ware, controllers_admin_store_save );


//@
//@ discount
router.get('/discount-program-add',	middle_ware, controllers_admin_discount_program_add );
router.get('/discount-program-show-all',	middle_ware, controllers_admin_discount_program_show_all );
router.get('/discount-program-product-add',	middle_ware, controllers_admin_discount_program_product_add );
router.post('/discount-program-product-denied',	middle_ware, controllers_admin_discount_program_product_denied );

router.get('/coupon-show-all',	middle_ware, controllers_admin_coupon_show_all );
router.get('/main',	middle_ware, controllers_admin_main );







//@
//@
//@
//@ brands
router.post('/brand-update', middle_ware, controllers_admin_brand_update );


































//@
//@
//@
//@ export
module.exports = router;
