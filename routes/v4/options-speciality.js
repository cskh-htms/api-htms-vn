

/* v5 
1. bussiness/user 
*/
// v5 
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');









//@
//@
//@
//@ controller
const controller_option_store = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/options/controllers-option-store.js'
);

const controller_store_option_product = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/options/controllers-option-store-product.js'
);







//@ admin
const controller_option_show_all = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/options/controller-option-show-all.js'
);


const controller_option_add = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/options/controller-option-add.js'
);


const controller_option_save = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/options/controller-option-save.js'
);


//@
//@
//@
//@ router 
router.get('/', controller_option_show_all);
router.get('/add/:store_id/', controller_option_add);
router.post('/save/', controller_option_save);



//@
router.get('/:store_id', controller_option_store);
router.get('/product/:option_id/:store_id', controller_store_option_product);





		
	
	
module.exports = router;
	
	
	

	