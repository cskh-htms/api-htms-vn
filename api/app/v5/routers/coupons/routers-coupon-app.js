
const express = require('express');
const router = express.Router();


const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');



const get_all =  require('../../controllers/coupons/controllers-coupon-get-all-app.js');
const checked_coupon =  require('../../controllers/coupons/controllers-coupon-checked-coupon-app.js');
const checked_coupon_dala =  require('../../controllers/coupons/controllers-coupon-checked-coupon-dala-app.js');
const checked_coupon_code =  require('../../controllers/coupons/controllers-coupon-checked-coupon-code-app.js');


router.get('/', function(req, res, next) {
  res.end('App coupon v5 welcom ');
});

router.get('/get-all/', middle_ware,get_all);
router.get('/checked-coupon/', middle_ware,checked_coupon);
router.get('/checked-coupon-dala/', middle_ware,checked_coupon_dala);
router.get('/checked-coupon-code/', middle_ware,checked_coupon_code);



module.exports = router;
