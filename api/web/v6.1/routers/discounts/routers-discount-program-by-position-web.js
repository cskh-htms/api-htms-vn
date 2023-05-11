const express = require('express');
const router = express.Router();

const config_api = require('../../configs/config');



const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-web.js');

const controllers_discount_by_position_web =  require('../../controllers/discounts/controllers-discount-by-position-web.js');
const controllers_discount_by_product_web =  require('../../controllers/discounts/controllers-discount-by-product-web.js');
const controllers_discount_by_store_web =  require('../../controllers/discounts/controllers-discount-by-store-web.js');

router.get('/', function(req, res, next) {
  res.end('App API discounts speciality v5 welcom ');
});


router.get('/by-position', middle_ware,controllers_discount_by_position_web);

router.get('/by-product', middle_ware,controllers_discount_by_product_web);

router.get('/by-store', middle_ware,controllers_discount_by_store_web);


module.exports = router;
