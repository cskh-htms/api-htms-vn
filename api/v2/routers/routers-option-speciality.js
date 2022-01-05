
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
var controllers_options_speciality = require('../controllers/controllers-options-speciality');








//@@
//@@
//@@
//insert
try {
	router.post('/', middle_ware, controllers_options_speciality.insert_option_speciality);
}
catch(error){
	res.send( { "error" : "c_r_api_10_options_speciality" , "mesage" : error } );
}
//@@
//@@
//@@
//get all 
try {
	router.get('/', middle_ware, controllers_options_speciality.get_all_option_speciality);
}
catch(error){
	res.send( { "error" : "c_r_api_11_options_speciality" , "mesage" : error } );
}

//@@
//@@
//@@
//get one 
try {
	router.get('/:option_id', middle_ware, controllers_options_speciality.get_one_option_speciality);
}
catch(error){
	res.send( { "error" : "c_r_api_12_options_speciality" , "mesage" : error } );
}

//@@
//@@
//@@
//update
try {
	router.put('/:option_id', middle_ware, controllers_options_speciality.update_option_speciality);
}
catch(error){
	res.send( { "error" : "c_r_api_13_options_speciality" , "mesage" : error } );
}


//@@
//@@
//@@
//update
try {
	router.delete('/:option_id', middle_ware, controllers_options_speciality.delete_option_speciality);
}
catch(error){
	res.send( { "error" : "c_r_api_13_options_speciality" , "mesage" : error } );
}

//@@
//@@
//@@
//update
try {
	router.post('/search', middle_ware, controllers_options_speciality.search);
}
catch(error){
	res.send( { "error" : "c_r_api_13_options_speciality" , "mesage" : error } );
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