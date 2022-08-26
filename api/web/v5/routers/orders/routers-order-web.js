
const express = require('express');
const router = express.Router();


const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');


const controllers_order_insert_web =  require('../../controllers/orders/controllers-order-insert-web.js');
const controllers_order_khach_hang_huy_don =  require('../../controllers/orders/controllers-order-khach-hang-huy-don-api-web.js');
router.get('/', function(req, res, next) {
  res.end('App orders v5 welcom ');
});

router.post('/insert', middle_ware,controllers_order_insert_web);
router.get('/khach-hang-huy-don/:order_id', middle_ware,controllers_order_khach_hang_huy_don);



module.exports = router;
