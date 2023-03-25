
//@
//@
//@
//@ require
var express = require('express');
var router = express.Router();
const config_api = require('../../../../configs/config-api');



const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-app.js');

//@
//@
//@
//@ home 
router.get('/', function(req, res, next) {
  res.end('App API users v5 welcom ');
});





//@
//@
//@
//@ controller
const controllers_user_check_token_app =  require('../../controllers/users/controllers-user-check-token-app.js');
const controllers_user_register_app =  require('../../controllers/users/controllers-user-register-app.js');
const controllers_user_login_app =  require('../../controllers/users/controllers-user-login-app.js');
const controllers_user_get_by_id_app =  require('../../controllers/users/controllers-user-get-by-id-app.js');

const controllers_user_get_verification_code_app =  require('../../controllers/users/controllers-user-get-verification-code-app.js');
const controllers_user_verification_code_app =  require('../../controllers/users/controllers-user-verification-code-app.js');
const controllers_user_get_verification_code_lost_app =  require('../../controllers/users/controllers-user-get-verification-code-lost-app.js');
const controllers_user_verification_code_lost_app =  require('../../controllers/users/controllers-user-verification-code-lost-app.js');

const controllers_user_change_password_app =  require('../../controllers/users/controllers-user-change-password-app.js');
const controllers_user_lost_password_app =  require('../../controllers/users/controllers-user-lost-password-app.js');
const controllers_user_update_app =  require('../../controllers/users/controllers-user-update-app.js');



const controllers_user_get_marketing_total =  require('../../controllers/users/controllers-user-get-marketing-total.js');


//@
//@
//@
//@ router
router.post('/check-token', controllers_user_check_token_app);
router.post('/register', controllers_user_register_app);
router.post('/login', controllers_user_login_app);
router.get('/get-by-id/:user_id', middle_ware, controllers_user_get_by_id_app);

router.get('/get-verification-code', middle_ware, controllers_user_get_verification_code_app);
router.get('/get-verification-code-lost', controllers_user_get_verification_code_lost_app);

router.post('/verification-code', middle_ware, controllers_user_verification_code_app);
router.post('/verification-code-lost', controllers_user_verification_code_lost_app);

router.post('/change-password/:user_id', middle_ware, controllers_user_change_password_app);
router.post('/lost-password', controllers_user_lost_password_app);
router.post('/update/:user_id', middle_ware, controllers_user_update_app);



router.get('/marketing-total', middle_ware, controllers_user_get_marketing_total);



//@
//@
//@
//@  export
module.exports = router;










//@
//@
//@
//@ file end