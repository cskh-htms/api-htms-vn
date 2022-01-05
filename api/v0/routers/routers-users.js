

/*
@@@@
@@@@@
@@@@@
@@@@@
*/

var express = require('express');
var router = express.Router();

//chuyen huong controller 
var controllers_users = require('../controllers/controllers-users');






//login user//@->/controllers/controllers-users.js
router.post('/login', controllers_users.login);
//@
//@
//@
//dang ký users
router.post('/register', controllers_users.register_users);

//login user//@->/controllers/controllers-users.js
router.post('/login-default', controllers_users.login_default);

//check token
router.post('/check-token', controllers_users.check_token);

//get version
router.post('/get-version', controllers_users.get_version);

//check_role
router.post('/get-role', controllers_users.get_role);


//check_role
router.post('/get-owner-user', controllers_users.get_owner_user);




//@@
//@@
//get one 



/*
@@@@
@@@@@
@@@@@
@@@@@
*/

module.exports = router;



/*
@@@@
@@@@@
@@@@@
@@@@@
*/























