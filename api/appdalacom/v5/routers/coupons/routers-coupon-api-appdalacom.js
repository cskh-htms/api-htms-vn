
//@
//@
//@
//@ file start




//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();





//@
//@
//@
//@ config
const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');





//@
//@
//@
//@ controller link
const controllers_bussiness_by_user_id =  require('../../controllers/bussiness/controllers-bussiness-by-user-id-appdalacom-api');
const controllers_coupon_add =  require('../../controllers/coupons/controllers-coupon-add-api-appdalacom');
const controllers_coupon_show =  require('../../controllers/coupons/controllers-coupon-show-api-appdalacom');

const controllers_coupon_save =  require('../../controllers/coupons/controllers-coupon-save-api-appdalacom');
const controllers_coupon_delete =  require('../../controllers/coupons/controllers-coupon-delete-api-appdalacom');
const controllers_coupon_update =  require('../../controllers/coupons/controllers-coupon-update-api-appdalacom');

const controllers_coupon_store_id =  require('../../controllers/coupons/controllers-coupon-store-id-api-appdalacom');


//@ admin
const controllers_coupon_show_admin =  require('../../controllers/coupons/controllers-coupon-show-admin-api-appdalacom');
const controllers_coupon_quan_ly_admin =  require('../../controllers/coupons/controllers-coupon-quan-ly-admin-api-appdalacom');






//@
//@
//@
//@ router 
router.get('/', function(req, res, next) {
  res.end('api appdalacom bussiness by user welcom');
});


//@ bussiness
router.get('/add/',middle_ware, controllers_coupon_add );
router.get('/show/',middle_ware, controllers_coupon_show );
router.post('/save/',middle_ware, controllers_coupon_save );
router.delete('/delete/',middle_ware, controllers_coupon_delete );
router.put('/update/',middle_ware, controllers_coupon_update );
router.get('/store/',middle_ware, controllers_coupon_store_id );


//@ admin
router.get('/show-admin/:coupon_id/:store_id',middle_ware, controllers_coupon_show_admin );
router.get('/quan-ly-admin/',middle_ware, controllers_coupon_quan_ly_admin );




router.get('/:user_id',middle_ware, controllers_bussiness_by_user_id );





//@
//@
//@
//@ export
module.exports = router;





//@
//@
//@
//@ file end




