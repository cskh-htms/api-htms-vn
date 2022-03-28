

const express = require('express');
const router = express.Router();

const config_api = require('../../../../configs/config-api');

const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');

const controllers_bussiness_by_user_id =  require('../../controllers/bussiness/controllers-bussiness-by-user-id-appdalacom-api');
const controllers_coupon_add =  require('../../controllers/coupons/controllers-coupon-add-api-appdalacom');
const controllers_coupon_show =  require('../../controllers/coupons/controllers-coupon-show-api-appdalacom');
const controllers_coupon_save =  require('../../controllers/coupons/controllers-coupon-save-api-appdalacom');
const controllers_coupon_delete =  require('../../controllers/coupons/controllers-coupon-delete-api-appdalacom');
const controllers_coupon_update =  require('../../controllers/coupons/controllers-coupon-update-api-appdalacom');


router.get('/', function(req, res, next) {
  res.end('api appdalacom bussiness by user welcom');
});


router.get('/:user_id',middle_ware, controllers_bussiness_by_user_id );
router.get('/add/:store_id/:user_id',middle_ware, controllers_coupon_add );
router.get('/show/:coupon_id/:store_id',middle_ware, controllers_coupon_show );
router.post('/save',middle_ware, controllers_coupon_save );

router.delete('/delete/:coupon_id',middle_ware, controllers_coupon_delete );
router.put('/update/:coupon_id',middle_ware, controllers_coupon_update );





module.exports = router;
