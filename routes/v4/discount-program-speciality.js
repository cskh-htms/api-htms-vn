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
			
const controllers_discount_program_product_delete = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/admin/discount-programs/controllers-discount-program-product-delete'
	);	
		

const controllers_discount_program_product_add = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/admin/discount-programs/controllers-discount-program-product-add'
	);	
		

const controllers_discount_program_product_denied = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/admin/discount-programs/controllers-discount-program-product-denied'
	);	



const controllers_discount_program_view_discount = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/admin/discount-programs/controllers-discount-program-view-discount'
	);	


const controllers_discount_program_view_product = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/admin/discount-programs/controllers-discount-program-view-product'
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
router.delete('/product-delete/:product_link_id/', controllers_discount_program_product_delete);
router.put('/product-add/:link_id/', controllers_discount_program_product_add);
router.put('/product-denied/:link_id/', controllers_discount_program_product_denied);
router.get('/view-discount/:discount_id/', controllers_discount_program_view_discount);
router.get('/view-product/:product_id/', controllers_discount_program_view_product);






//@
//@
//@
//@
//@ controller manage
const controller_discount_manage_show_all = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/discount-program/controller-discount-manage-show-all'
	);	

const controller_discount_manage_product_add = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/discount-program/controller-discount-manage-product-add'
	);	


const controller_discount_manage_product_save = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/discount-program/controller-discount-manage-product-save'
	);	


const controller_discount_manage_product_delete = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/discount-program/controller-discount-manage-product-delete'
	);	


const controller_discount_manage_view_discount = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/discount-program/controller-discount-manage-view-discount'
	);	
	
	
const controller_discount_manage_product_add_gift = require(
		'../../controllers/' + 
		ojs_configs.controller_version + 
		'/discount-program/controller-discount-manage-product-add-gift'
	);		







//@
//@
//@
//@
//@ router manage
router.get('/manage/:store_id', controller_discount_manage_show_all);
router.get('/manage/product/add/:discount_program_id/:store_id', controller_discount_manage_product_add);
router.post('/manage/product/save/', controller_discount_manage_product_save);
router.delete('/manage/product/delete/:discount_program_link_id', controller_discount_manage_product_delete);

router.get('/manage/product/add-gift/:discount_program_id/:store_id', controller_discount_manage_product_add_gift);




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


	