
const express = require('express');
const router = express.Router();


const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-app.js');

const controllers_shipping_caution_app =  require('../../controllers/shippings/controllers-shipping-caution-app.js');


router.get('/', function(req, res, next) {
  res.end('App shipping v5 welcom ');
});

router.post('/caution/', middle_ware, controllers_shipping_caution_app);



module.exports = router;
