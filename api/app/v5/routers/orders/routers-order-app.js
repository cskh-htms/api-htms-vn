
const express = require('express');
const router = express.Router();


const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');


const controllers_order_insert_app =  require('../../controllers/orders/controllers-order-insert-app.js');

router.get('/', function(req, res, next) {
  res.end('App orders v5 welcom ');
});

router.post('/insert', middle_ware,controllers_order_insert_app);




module.exports = router;
