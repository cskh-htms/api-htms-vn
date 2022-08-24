
const express = require('express');
const router = express.Router();


const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');

const controllers_discount_by_position_app =  require('../../controllers/discounts/controllers-discount-by-position-app.js');
const controllers_discount_by_product_app =  require('../../controllers/discounts/controllers-discount-by-product-app.js');
const controllers_discount_by_store_app =  require('../../controllers/discounts/controllers-discount-by-store-app.js');

router.get('/', function(req, res, next) {
  res.end('App API discounts speciality v5 welcom ');
});


router.get('/by-position', middle_ware,controllers_discount_by_position_app);

router.get('/by-product', middle_ware,controllers_discount_by_product_app);

router.get('/by-store', middle_ware,controllers_discount_by_store_app);


module.exports = router;
