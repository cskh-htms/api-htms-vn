


//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();
const config_api = require('../../configs/config');


//@
//@
//@
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-app.js');

const get_all_by_order_id =  require('../../controllers/shipping-tracking/controllers-shipping-tracking-get-all-by-order-id-api-app.js');


router.get('/', function(req, res, next) {
  res.end('App orders v5 welcom ');
});

router.get('/get-all-by-order-id/:order_id', middle_ware,get_all_by_order_id);



module.exports = router;
