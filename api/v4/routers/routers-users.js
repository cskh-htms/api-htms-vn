

/*
@@@@
@@@@@
@@@@@
@@@@@

1. 	* [register-app]
	* Đăng ký users trên app
	
2. 	* [login-app]
	* login users trên app	
	
3. 	* [aet_all_users]
	* lấy tất cả users
	* chỉ admin mới được lấy
	

4. 	* [aet_one_user]
	* lấy user theo ID
	* Chỉ có chủ user mới dc lấy
	
5. 	* [update_users]
	* update users
	* Chỉ có chủ user mới dc update
	
	
	
6. 	* [get-verification-code]
	*  tạo max xác thực
	
	
7. 	* [verification-code]
	* xác thực	điện thoại
	
	
	
*/

var express = require('express');
var router = express.Router();
var middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
var controllers_users = require('../controllers/controllers-users');





//@@
//@@
//@@
//1. [register-app]
router.post('/register-app', controllers_users.register_app);

//@@
//@@
//@@
//2. [login-app]
router.post('/login-app', controllers_users.login_app);


//@@
//@@
//@@
//3. [get_all_users] 
router.get('/', middle_ware, controllers_users.get_all_users);





//@@
//@@
//@@
//4. [get_one_user] 
router.get('/:user_id', middle_ware, controllers_users.get_one_users);




//@@
//@@
//@@
//5. [update_users] 
router.put('/:user_id', middle_ware, controllers_users.update_users);



//@@
//@@
//@@
//6. [get-verification-code] 
router.post('/get-verification-code', middle_ware, controllers_users.get_verification_code);





//@@
//@@
//@@
//7. [verification-code] 
router.post('/verification-code', middle_ware, controllers_users.verification_code);













//@@
//@@
//@@
//insert
try {
	router.post('/', middle_ware, controllers_users.insert_users);
}
catch(error){
	res.send( { "error" : "c_r_api_10_users" , "mesage" : error } );
}
//@@
//@@

//@@
//@@
//@@
//register
try {
	router.post('/register', controllers_users.register_users);
}
catch(error){
	res.send( { "error" : "c_r_api_10_users" , "mesage" : error } );
}
//@@
//@@
//@@
//@@





//@@
//@@
//@@
//delete
try {
	router.delete('/:user_id', middle_ware, controllers_users.delete_users);
}
catch(error){
	res.send( { "error" : "c_r_api_13_users" , "mesage" : error } );
}


//@@
//@@
//@@
//search
try {
	router.post('/search', middle_ware, controllers_users.search);
}
catch(error){
	res.send( { "error" : "c_r_api_13_users" , "mesage" : error } );
}


//login user//@->/controllers/controllers-users.js
router.post('/login', controllers_users.login);

//login user//@->/controllers/controllers-users.js
router.post('/login-default', controllers_users.login_default);


//check token
router.post('/check-token', controllers_users.check_token);



//check token
router.post('/check-token-app', controllers_users.check_token_app);









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























