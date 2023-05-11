
const express = require('express');
const router = express.Router();


const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-web.js');

const controllers_product_by_category_web =  require('../../controllers/products/controllers-product-by-category-web.js');
const controllers_product_by_id_web =  require('../../controllers/products/controllers-product-by-id-web.js');
const controllers_product_by_store_web =  require('../../controllers/products/controllers-product-by-store-web.js');
const controllers_product_fillter_web =  require('../../controllers/products/controllers-product-fillter-web.js');




router.get('/', function(req, res, next) {
  res.end('App product v5 welcom ');
});

router.get('/by-category', middle_ware,controllers_product_by_category_web);
router.get('/by-id', middle_ware,controllers_product_by_id_web);
router.get('/by-store', middle_ware,controllers_product_by_store_web);
router.post('/fillter', middle_ware,controllers_product_fillter_web);


module.exports = router;
