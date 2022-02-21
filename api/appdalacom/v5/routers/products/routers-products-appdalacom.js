

const express = require('express');
const router = express.Router();

const config_api = require('../../../../configs/config-api');

const middle_ware =  require(
	'../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware'
);

const controllers_products_by_store =  require(
	'../../controllers/products/controllers-products-by-store-appdalacom-api'
);

const controllers_products_ajax_products_list =  require(
	'../../controllers/products/controllers-products-ajax-products-list-appdalacom-api.js'
);

const controllers_products_ajax_products_list_table =  require(
	'../../controllers/products/controllers-products-ajax-products-list-table-appdalacom-api.js'
);

const controllers_products_update_stock =  require(
	'../../controllers/products/controllers-products-update-stock-appdalacom-api'
);

const controllers_products_phe_duyet =  require(
    '../../controllers/products/controllers-products-phe-duyet-appdalacom-api.js'
);

const controllers_products_tu_choi =  require(
    '../../controllers/products/controllers-products-tu-choi-appdalacom-api.js'
);

const controllers_products_store_update =  require(
    '../../controllers/products/controllers-products-store-update-appdalacom-api.js'
);



router.get('/', function(req, res, next) {
  res.end('api appdalacom products by user welcom');
});



router.get('/speciality/:store_id',middle_ware, controllers_products_by_store );
router.post('/speciality/ajax-proructs-list/',middle_ware,controllers_products_ajax_products_list );
router.post('/speciality/ajax-proructs-list-table/',middle_ware,controllers_products_ajax_products_list_table );
router.post('/speciality/update-stock/:product_id',middle_ware, controllers_products_update_stock );
router.post('/speciality/phe-duyet/:product_id',middle_ware, controllers_products_phe_duyet );
router.post('/speciality/tu-choi/:product_id',middle_ware, controllers_products_tu_choi );

router.post('/speciality/store-update/:product_id',middle_ware, controllers_products_store_update );



module.exports = router;
