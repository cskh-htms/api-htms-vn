//@
//@
//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();
const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-appdalacom.js');






//@
//@
//@
//@
//@
//@ controller
const controllers_bussiness_show_all =  
require('../../controllers/bussiness/controller-bussiness-show-all');


const controllers_bussiness_ajax_load =  
require('../../controllers/bussiness/controller-bussiness-ajax-load.js');

const controllers_bussiness_ajax_load_order_detail =  
require('../../controllers/bussiness/controller-bussiness-ajax-load-order-detail.js');









//@
//@
//@
//@
//@
//@ router
router.get('/', function(req, res, next) {
  res.end('api appdalacom bussiness by user welcom');
});

router.get('/show-all',middle_ware, controllers_bussiness_show_all );
router.post('/ajax-load',middle_ware, controllers_bussiness_ajax_load );
router.post('/ajax-load-order-detail',middle_ware, controllers_bussiness_ajax_load_order_detail );







module.exports = router;
