

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
const controller_traffic_app =  require('../../controllers/traffics/controller-tracking-app.js');






//@
//@
//@
router.get('/', middle_ware,function(req, res, next) {
  res.end('App dala welcom ');
});








//@
//@
//@
router.post('/',controller_traffic_app);






module.exports = router;
