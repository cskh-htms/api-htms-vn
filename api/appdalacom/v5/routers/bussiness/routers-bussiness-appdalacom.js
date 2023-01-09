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


router.get('/', function(req, res, next) {
  res.end('api appdalacom bussiness by user welcom');
});










router.get('/show-all',middle_ware, controllers_bussiness_show_all );






module.exports = router;
