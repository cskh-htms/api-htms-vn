const express = require('express');
const router = express.Router();

const config_api = require('../../configs/config');



const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-web.js');



const controllers_shipping_caution_web =  require('../../controllers/shippings/controllers-shipping-caution-web.js');
const controllers_shipping_get_all_province_web =  require('../../controllers/shippings/controllers-shipping-get-all-province-web.js');
const controllers_shipping_get_distict_by_provice_web =  require('../../controllers/shippings/controllers-shipping-get-district-by-province-web.js');
const controllers_shipping_get_ward_by_district_web =  require('../../controllers/shippings/controllers-shipping-get-ward-by-district-web.js');


router.get('/', function(req, res, next) {
  res.end('App shipping v5 welcom ');
});

router.post('/caution/', middle_ware, controllers_shipping_caution_web);
router.get('/get-all-province/', middle_ware, controllers_shipping_get_all_province_web);
router.get('/get-district', middle_ware, controllers_shipping_get_distict_by_provice_web);
router.get('/get-ward', middle_ware, controllers_shipping_get_ward_by_district_web);



module.exports = router;
