

/*
@@@@
@@@@@
@@@@@
@@@@@

1. 	* [register-app]
	* Đăng ký users trên app
	
2. 	* [login-app]
	* login users trên app	
	
	
	
	
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
//get all 
try {
	router.get('/', middle_ware, controllers_users.get_all_users);
}
catch(error){
	res.send( { "error" : "c_r_api_11_users" , "mesage" : error } );
}

//@@
//@@
//@@
//get one 
try {
	router.get('/:user_id', middle_ware, controllers_users.get_one_users);
}
catch(error){
	res.send( { "error" : "c_r_api_12_users" , "mesage" : error } );
}



//@@
//@@
//@@
//update
try {
	router.put('/:user_id', middle_ware, controllers_users.update_users);
}
catch(error){
	res.send( { "error" : "c_r_api_13_users" , "mesage" : error } );
}


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























