//@
//@
//@
//@ fileds start









const express = require('express');
const router = express.Router();

const config_api = require('../../../../configs/config-api');
const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware');




const controllers_user_login =  require('../../controllers/users/controllers-user-login.js');

router.get('/', function(req, res, next) {
  res.end('appdala.com API users v5 welcom ');
});







//@
//@
//@
//@ router
router.post('/login', controllers_user_login);










//@
//@
//@
//@ export
module.exports = router;












//@
//@
//@
//@ fileds end







