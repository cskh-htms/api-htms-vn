const express = require('express');
const router = express.Router();

const config_api = require('../../configs/config');




const middle_ware =  require('../../../../lib/' + config_api.API_LIB_VERSION + '/middle-ware/middle-ware-web.js');




const controllers_user_login_web =  require('../../controllers/users/controllers-user-login-web.js');
const controllers_user_check_token_web =  require('../../controllers/users/controllers-user-check-token-web.js');
const controllers_user_register_web =  require('../../controllers/users/controllers-user-register-web.js');
const controllers_user_lost_password_web =  require('../../controllers/users/controllers-user-lost-password-web.js');

const controllers_user_get_verification_code_web =  require('../../controllers/users/controllers-user-get-verification-code-web.js');
const controllers_user_verification_code_web =  require('../../controllers/users/controllers-user-verification-code-web.js');

const controllers_user_check_verification_web =  require('../../controllers/users/controllers-user-check-verification-web.js');
const controllers_user_get_by_id_web =  require('../../controllers/users/controllers-user-get-by-id-web.js');

const controllers_user_change_password_web =  require('../../controllers/users/controllers-user-change-password-web.js');



const controllers_user_get_verification_code_lost_web =  require('../../controllers/users/controllers-user-get-verification-code-lost-web.js');
const controllers_user_verification_code_lost_web =  require('../../controllers/users/controllers-user-verification-code-lost-web.js');


const controllers_user_get_marketing_total =  require('../../controllers/users/controllers-user-get-marketing-total.js');
const controllers_user_get_marketing_order =  require('../../controllers/users/controllers-user-get-marketing-order.js');




router.get('/', function(req, res, next) {
  res.end('web API users v5 welcom ');
});








router.post('/login', controllers_user_login_web);
router.post('/check-token', controllers_user_check_token_web);
router.post('/register', controllers_user_register_web);
router.post('/lost-password', controllers_user_lost_password_web);
router.get('/check-verification', controllers_user_check_verification_web);
router.get('/get-verification-code', middle_ware, controllers_user_get_verification_code_web);
router.post('/verification-code', middle_ware, controllers_user_verification_code_web);
router.get('/get-by-id/:user_id', middle_ware, controllers_user_get_by_id_web);
router.post('/change-password/:user_id', middle_ware, controllers_user_change_password_web);


router.get('/get-verification-code-lost', controllers_user_get_verification_code_lost_web);
router.post('/verification-code-lost', controllers_user_verification_code_lost_web);


router.get('/marketing-total', middle_ware, controllers_user_get_marketing_total);
router.get('/marketing-order', middle_ware, controllers_user_get_marketing_order);








module.exports = router;