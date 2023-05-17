

//@
//@
//@
//@ require
const express = require('express');
const router = express.Router();
const config_api = require('../../configs/config');





const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-web.js');
const controller_tracking_web =  require('../../controllers/trackings/controller-tracking-web.js');


//@
//@
//@
router.get('/', function(req, res, next) {
  res.end('App dala welcom ');
});



//@
//@
//@
router.post('/', middle_ware,controller_tracking_web);






module.exports = router;
