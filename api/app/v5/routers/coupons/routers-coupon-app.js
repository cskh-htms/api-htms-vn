
const express = require('express');
const router = express.Router();


const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');



const get_all =  require('../../controllers/coupons/controllers-coupon-get-all-app.js');


router.get('/', function(req, res, next) {
  res.end('App coupon v5 welcom ');
});

router.get('/get-all/', middle_ware,get_all);



module.exports = router;
