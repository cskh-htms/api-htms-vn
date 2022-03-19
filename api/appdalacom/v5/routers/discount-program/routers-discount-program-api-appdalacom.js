

const express = require('express');
const router = express.Router();

const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');


const controllers_discount_program_product_add_list = require(
	'../../controllers/discount-program/controllers-discount-program-product-add-list-api-appdalacom'
);

const controllers_discount_program_quan_ly_admin =  require(
	'../../controllers/discount-program/controllers-discount-program-quan-ly-admin-api-appdalacom.js'
);


//@ router
router.get('/', function(req, res, next) {
  res.end('api appdalacom products by user welcom');
});

router.get(
	'/speciality/product/add/:discount_program_details_id/:store_id/:user_id',
	middle_ware, 
	controllers_discount_program_product_add_list 
);

router.get(
	'/speciality/quan-ly-admin/',
	middle_ware, 
	controllers_discount_program_quan_ly_admin 
);




module.exports = router;
