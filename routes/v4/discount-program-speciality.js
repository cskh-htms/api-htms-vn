//@
//@
//@
//@
//@ reqiure
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');





//@
//@
//@
//@
//@ admin
const controllers_discount_program_admin_quan_ly_show_all = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/admin/discount-programs/controllers-discount-program-show-all'
	);	
const controllers_discount_program_show = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/admin/discount-programs/controllers-discount-program-show'
	);	

const controllers_discount_program_update = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/admin/discount-programs/controllers-discount-program-update'
	);	

const controllers_discount_program_add = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/admin/discount-programs/controllers-discount-program-add.js'
	);	

	
const controllers_discount_program_save = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/admin/discount-programs/controllers-discount-program-save'
	);	
		
		
		
const controllers_discount_program_delete = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/admin/discount-programs/controllers-discount-program-delete'
	);	
			










//@
//@
//@
//@
//@ admin
router.get('/', controllers_discount_program_admin_quan_ly_show_all);
router.get('/show/:discount_program_id/:store_id', controllers_discount_program_show);
router.put('/update/:discount_program_id/', controllers_discount_program_update);
router.get('/add/:store_id', controllers_discount_program_add);
router.post('/save/', controllers_discount_program_save);
router.delete('/delete/:discount_program_id/', controllers_discount_program_delete);




/*

//@
//@
//@
//@
//@ bussiness
const controllers_discount_program_product_add_list = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/discount-program/controllers-discount-program-product-add-list-web-appdalacom.js'
	);
	
	
const controllers_discount_program_product_add_gift = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/discount-program/controllers-discount-program-product-add-gift-web-appdalacom.js'
	);	
	
const controllers_discount_program_product_add_meny = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/discount-program/controllers-discount-program-product-add-meny-web-appdalacom.js'
	);		
	
	
const controllers_discount_program_store_id = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/discount-program/controllers-discount-program-store-id-web-appdalacom.js'
	);	
	
const controllers_discount_program_store_quan_ly = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/discount-program/controllers-discount-program-store-quan-ly-web-appdalacom.js'
	);		
	
	
	
	

const controllers_discount_program_product_save_gift = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/discount-program/controllers-discount-program-product-save-gift-web-appdalacom.js'
	);		
	
const controllers_discount_program_product_save_meny = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/discount-program/controllers-discount-program-product-save-meny-web-appdalacom.js'
	);		


	
const controllers_discount_program_product_save = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/discount-program/controllers-discount-program-product-save-web-appdalacom.js'
	);	

const controllers_discount_program_product_delete = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/discount-program/controllers-discount-program-product-delete.js'
	);	







	
	
//@
//@
//@
//@
//@ admin
const controllers_discount_program_admin_quan_ly_show_all = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/admin/discount-programs/controllers-discount-program-show-all'
	);	
const controllers_discount_program_show = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/admin/discount-programs/controllers-discount-program-show'
	);	

const controllers_discount_program_update = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/admin/discount-programs/controllers-discount-program-update'
	);	











const controllers_discount_program_quan_ly_admin = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/discount-program/controllers-discount-program-quan-ly-admin-web-appdalacom.js'
	);
	
const controllers_discount_program_store_active_admin = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/discount-program/controllers-discount-program-store-active-admin-web-appdalacom.js'
	);	
	
	
	
	
const controllers_discount_program_save = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/admin/discount-programs/controllers-discount-program-save.js'
	);	








//@
//@
//@
//@
//@ bussiness
router.get('/product/add/:discount_program_id/:store_id/', controllers_discount_program_product_add_list);
router.get('/product/add-gift/:discount_program_id/:store_id/', controllers_discount_program_product_add_gift);
router.get('/product/add-meny/:discount_program_id/:store_id/', controllers_discount_program_product_add_meny);


router.get('/stores/:store_id/', controllers_discount_program_store_id);
router.get('/store-quan-ly/:store_id', controllers_discount_program_store_quan_ly);



router.post('/product-save/', controllers_discount_program_product_save);
router.post('/product-save-gift/', controllers_discount_program_product_save_gift);
router.post('/product-save-meny/', controllers_discount_program_product_save_meny);
router.get('/product-delete/:discount_program_product_link_id/', controllers_discount_program_product_delete);















//router.get('/quan-ly', controllers_discount_program_quan_ly_admin);
//router.get('/store-active', controllers_discount_program_store_active_admin);
//router.get('/admin/add/:store_id', controllers_discount_program_admin_add);


	

*/


//@
//@
//@
//@
//@ router	
module.exports = router;
	
	
	









//@
//@
//@
//@
//@ end	


	