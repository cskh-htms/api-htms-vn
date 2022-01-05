

/*
@@@@
@@@@@
@@@@@
@@@@@
*/

var express = require('express');
var router = express.Router();

//chuyen huong controller 
var controllers_users_type = require('../controllers/controllers-users-type');





//@@
//@@
//@@
//get all notoken
//router.get('/list', controllers_users_type.get_all_users_type_no_token);

router.get('/list', controllers_users_type.get_all_users_type_no_token);




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



























