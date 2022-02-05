

const express = require('express');
const router = express.Router();

const config_api = require('../../../../configs/config-api');

const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');

const controllers_products_by_store =  require('../../controllers/products/controllers-products-by-store-appdalacom-api');


router.get('/', function(req, res, next) {
  res.end('api appdalacom products by user welcom');
});


router.get('/speciality/:store_id',middle_ware, controllers_products_by_store );

module.exports = router;
