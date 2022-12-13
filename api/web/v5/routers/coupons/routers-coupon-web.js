
const express = require('express');
const router = express.Router();


const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-web.js');



const get_all =  require('../../controllers/coupons/controllers-coupon-get-all-web.js');
const checked_coupon =  require('../../controllers/coupons/controllers-coupon-checked-coupon-web.js');
const checked_coupon_dala =  require('../../controllers/coupons/controllers-coupon-checked-coupon-dala-web.js');
const checked_coupon_code =  require('../../controllers/coupons/controllers-coupon-checked-coupon-code-web.js');


router.get('/', function(req, res, next) {
  res.end('App coupon v5 welcom ');
});


//@
// * lấy danh sách tất cả các coupon
router.get('/get-all/', middle_ware,get_all);

//@
// * lấy danh sách tất cả các coupon của cửa hàng thuộc order
router.post('/checked-coupon/', middle_ware,checked_coupon);

//@
// * lấy danh sách tất cả các coupon của DALA (tất cả đều dùng dc) thuộc order
router.post('/checked-coupon-dala/', middle_ware,checked_coupon_dala);



//@
// * check coupon gữi lên
router.post('/checked-coupon-code/', middle_ware,checked_coupon_code);



module.exports = router;
