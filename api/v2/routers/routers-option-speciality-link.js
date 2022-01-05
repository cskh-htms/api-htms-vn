
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
var controllers_options_speciality_link = require('../controllers/controllers-options-speciality-link');








//@@
//@@
//@@
//insert
try {
	router.post('/', middle_ware, controllers_options_speciality_link.insert_option_speciality_link);
}
catch(error){
	res.send( { "error" : "c_r_api_10_options_speciality" , "mesage" : error } );
}
//@@
//@@
//@@
//@@
//@@
//insert
try {
	router.post('/search', middle_ware, controllers_options_speciality_link.search);
}
catch(error){
	res.send( { "error" : "c_r_api_10_options_speciality" , "mesage" : error } );
}
//@@
//@@
//@@
//get all 
try {
	router.get('/', middle_ware, controllers_options_speciality_link.get_all_option_speciality_link);
}
catch(error){
	res.send( { "error" : "c_r_api_11_options_speciality" , "mesage" : error } );
}

//@@
//@@
//@@
//get one 
try {
	router.get('/:option_link_id', middle_ware, controllers_options_speciality_link.get_one_option_speciality_link);
}
catch(error){
	res.send( { "error" : "c_r_api_12_options_speciality" , "mesage" : error } );
}

//@@
//@@
//@@
//update
try {
	router.put('/:option_link_id', middle_ware, controllers_options_speciality_link.update_option_speciality_link);
}
catch(error){
	res.send( { "error" : "c_r_api_13_options_speciality" , "mesage" : error } );
}


//@@
//@@
//@@
//update
try {
	router.delete('/:option_link_id', middle_ware, controllers_options_speciality_link.delete_option_speciality_link);
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