
const express = require('express');
const router = express.Router();


const config_api = require('../../../../configs/config-api');

const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-app.js');

const controllers_product_by_category_app =  require('../../controllers/products/controllers-product-by-category-app.js');
const controllers_product_by_category2_app =  require('../../controllers/products/controllers-product-by-category2-app.js');
const controllers_product_by_id_app =  require('../../controllers/products/controllers-product-by-id-app.js');
const controllers_product_by_store_app =  require('../../controllers/products/controllers-product-by-store-app.js');

const controllers_product_fillter_app =  require('../../controllers/products/controllers-product-fillter-app.js');

const controllers_product_search_by_name_app =  require('../../controllers/products/controllers-product-search-by-name.js');
const controllers_product_sale_app =  require('../../controllers/products/controllers-product-sale-app.js');
const controllers_product_by_best_sale_app =  require('../../controllers/products/controllers-product-by-best-sale-app.js');




router.get('/', function(req, res, next) {
  res.end('App product v5 welcom ');
});

router.get('/by-category', middle_ware,controllers_product_by_category_app);
router.get('/by-category2', middle_ware,controllers_product_by_category2_app);
router.get('/by-id', middle_ware,controllers_product_by_id_app);
router.get('/by-store', middle_ware,controllers_product_by_store_app);
router.post('/fillter', middle_ware,controllers_product_fillter_app);
router.get('/by-name', middle_ware,controllers_product_search_by_name_app);
router.get('/sale', middle_ware,controllers_product_sale_app);
router.get('/by-best-sale', middle_ware,controllers_product_by_best_sale_app);



module.exports = router;
