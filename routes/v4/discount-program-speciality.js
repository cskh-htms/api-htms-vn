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


	