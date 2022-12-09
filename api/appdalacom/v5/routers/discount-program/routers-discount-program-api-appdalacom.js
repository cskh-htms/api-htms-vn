

const express = require('express');
const router = express.Router();

const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');



//@
//@
//@
//@ bussiness
const controllers_discount_program_product_add_list = require(
	'../../controllers/discount-program/controllers-discount-program-product-add-list-api-appdalacom'
);

const controllers_discount_program_product_add_gift = require(
	'../../controllers/discount-program/controllers-discount-program-product-add-gift-api-appdalacom'
);

const controllers_discount_program_product_add_meny = require(
	'../../controllers/discount-program/controllers-discount-program-product-add-meny-api-appdalacom'
);

const controllers_discount_program_store_id = require(
	'../../controllers/discount-program/controllers-discount-program-store-id-api-appdalacom'
);

const controllers_discount_program_store_quan_ly= require(
	'../../controllers/discount-program/controllers-discount-program-store-quan-ly-api-appdalacom'
);




const controllers_discount_program_show= require(
	'../../controllers/discount-program/controllers-discount-program-show-api-appdalacom'
);


const controllers_discount_program_save= require(
	'../../controllers/discount-program/controllers-discount-program-save-api-appdalacom.js'
);


const controllers_discount_program_product_save= require(
	'../../controllers/discount-program/controllers-discount-program-product-save-api-appdalacom.js'
);

const controllers_discount_program_product_save_gift= require(
	'../../controllers/discount-program/controllers-discount-program-product-save-gift-api-appdalacom.js'
);

const controllers_discount_program_product_save_meny= require(
	'../../controllers/discount-program/controllers-discount-program-product-save-meny-api-appdalacom.js'
);


const controllers_discount_program_product_delete= require(
	'../../controllers/discount-program/controllers-discount-program-delete.js'
);



//@
//@
//@ 
//@ admin 
const controllers_discount_program_quan_ly_admin =  require(
	'../../controllers/discount-program/controllers-discount-program-quan-ly-admin-api-appdalacom.js'
);


const controllers_discount_program_admin_quan_ly_show_all =  require(
	'../../controllers/discount-program/controllers-discount-program-admin-quan-ly-show-all-api-appdalacom.js'
);



const controllers_discount_program_store_active_admin =  require(
	'../../controllers/discount-program/controllers-discount-program-store-active-admin-api-appdalacom.js'
);




//@
//@
//@
//@ bussiness
router.get('/', function(req, res, next) {
  res.end('api appdalacom products by user welcom');
});

router.get(
	'/speciality/product/add',
	middle_ware, 
	controllers_discount_program_product_add_list 
);

router.get(
	'/speciality/product/add-gift',
	middle_ware, 
	controllers_discount_program_product_add_gift 
);



router.get(
	'/speciality/product/add-meny',
	middle_ware, 
	controllers_discount_program_product_add_meny
);



router.get(
	'/speciality/store',
	middle_ware, 
	controllers_discount_program_store_id 
);

router.get(
	'/speciality/store-quan-ly/:store_id',
	middle_ware, 
	controllers_discount_program_store_quan_ly 
);



router.get(
	'/speciality/show/:discount_program_id/:store_id',
	middle_ware, 
	controllers_discount_program_show 
);


router.post(
	'/speciality/save/',
	middle_ware, 
	controllers_discount_program_save
);





router.post(
	'/speciality/product-save/',
	middle_ware, 
	controllers_discount_program_product_save
);


router.post(
	'/speciality/product-save-gift/',
	middle_ware, 
	controllers_discount_program_product_save_gift
);

router.post(
	'/speciality/product-save-meny/',
	middle_ware, 
	controllers_discount_program_product_save_meny
);



router.get(
	'/speciality/product-delete/',
	middle_ware, 
	controllers_discount_program_product_delete
);





//@
//@
//@ 
//@ admin 
router.get(
	'/speciality/quan-ly-admin/',
	middle_ware, 
	controllers_discount_program_quan_ly_admin 
);

router.get(
	'/speciality/admin-quan-ly-show-all/',
	middle_ware, 
	controllers_discount_program_admin_quan_ly_show_all 
);



router.get(
	'/speciality/store-active-admin/',
	middle_ware, 
	controllers_discount_program_store_active_admin
);


module.exports = router;
