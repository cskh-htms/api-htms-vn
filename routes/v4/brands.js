//@
//@
//@
//@
/* v5 
1. bussiness/user 
*/
// v5 
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const ojs_configs = require('../../configs/config');
const config_api = require('../../api/configs/config-api');


const controller_brand_store = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/brands/controllers-brand-store.js'
);

const controller_store_brand_product = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/brands/controllers-brand-store-product.js'
);


const controller_brand_update = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/brands/controllers-brand-update.js'
);



const controller_brand_show_all = 
require(
	'../../controllers/' + 
	ojs_configs.controller_version + 
	'/admin/brands/controller-brand-show-all.js'
);




//@
//@
//@
//@ loader 
router.get('/', controller_brand_show_all);


router.get('/:store_id', controller_brand_store);
router.get('/product/:brand_id/:store_id', controller_store_brand_product);
router.post('/update/:brand_id/', controller_brand_update);



//end of v5



	
	
	
	
//@
//@
//@
//@ export
module.exports = router;
	
	
	




//@
//@
//@
//@ file end


	