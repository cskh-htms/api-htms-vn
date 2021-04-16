

/*
@@@@
@@@@@
@@@@@
@@@@@
*/

var express = require('express');
var router = express.Router();
var middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
var controllers_users_type = require('../controllers/controllers-users-type');



//@@
//@@
//@@
//insert
try {
	router.post('/', middle_ware, controllers_users_type.insert_users_type);
}
catch(error){
	res.send( { "error" : "c_r_api_10_users_type" , "mesage" : error } );
}
//@@
//@@
//@@
//get all 
try {
	router.get('/', middle_ware, controllers_users_type.get_all_users_type);
}
catch(error){
	res.send( { "error" : "c_r_api_11_users_type" , "mesage" : error } );
}


//@@
//@@
//@@
//get all notoken
//router.get('/list', controllers_users_type.get_all_users_type_no_token);

router.get('/list', controllers_users_type.get_all_users_type_no_token);


//@@
//@@
//@@
//get one 
try {
	router.get('/:users_type_id', middle_ware, controllers_users_type.get_one_users_type);
}
catch(error){
	res.send( { "error" : "c_r_api_12_users_type" , "mesage" : error } );
}

//@@
//@@
//@@
//update
try {
	router.put('/:users_type_id', middle_ware, controllers_users_type.update_users_type);
}
catch(error){
	res.send( { "error" : "c_r_api_13_users_type" , "mesage" : error } );
}


//@@
//@@
//@@
//update
try {
	router.delete('/:users_type_id', middle_ware, controllers_users_type.delete_users_type);
}
catch(error){
	res.send( { "error" : "c_r_api_13_users_type" , "mesage" : error } );
}






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



























