
//@
//@
//@
//@ start
const express = require('express');
const router = express.Router();

const config_api = require('../../../../configs/config-api');

const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');






//@
//@
//@
//@ controller link
const controllers_option_store =  
require(
	'../../controllers/options/controllers-option-store.js'
);

const controllers_option_store_product =  
require(
	'../../controllers/options/controllers-option-store-product.js'
);



//@
//@
//@
//@ router
router.get('/', function(req, res, next) {
  res.end('api appdalacom option welcom');
});


router.get(
	'/store/',
	middle_ware, 
	controllers_option_store
);

router.get(
	'/product/',
	middle_ware, 
	controllers_option_store_product
);



//@
//@
//@
//@ export
module.exports = router;




//@
//@
//@
//@ file end


