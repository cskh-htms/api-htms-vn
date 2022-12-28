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

const controllers_admin_store_show_all =  
require(
	'../../controllers/admin/stores/controllers-admin-stores-show-all'
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
//@ users
const controllers_admin_users_show_all =  
require(
	'../../controllers/admin/users/controllers-admin-users-show-all.js'
);

const controllers_admin_users_show =  
require(
	'../../controllers/admin/users/controllers-admin-users-show.js'
);
const controllers_admin_users_update =  
require(
	'../../controllers/admin/users/controllers-admin-users-update.js'
);
const controllers_admin_users_delete =  
require(
	'../../controllers/admin/users/controllers-admin-users-delete.js'
);
const controllers_admin_users_add =  
require(
	'../../controllers/admin/users/controllers-admin-users-add.js'
);

const controllers_admin_users_save =  
require(
	'../../controllers/admin/users/controllers-admin-users-save.js'
);

const controllers_admin_users_ajax_users_list =  
require(
	'../../controllers/admin/users/controllers-admin-users-ajax-users-list.js'
);






///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////










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
router.get('/stores-show-all',	middle_ware, controllers_admin_store_show_all );










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
//@ users
router.get('/users-show-all/', middle_ware, controllers_admin_users_show_all );
router.get('/users-show/', middle_ware, controllers_admin_users_show );
router.put('/users-update/', middle_ware, controllers_admin_users_update );
router.delete('/users-delete/', middle_ware, controllers_admin_users_delete );
router.get('/users-add/', middle_ware, controllers_admin_users_add );
router.post('/users-save/', middle_ware, controllers_admin_users_save );
router.post('/users-ajax-users-list/', middle_ware, controllers_admin_users_ajax_users_list );















//@
//@
//@
//@ export
module.exports = router;
