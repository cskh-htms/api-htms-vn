
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
var controllers_session_speciality = require('../controllers/controllers-session-spaciality');








//@@
//@@
//@@
//insert
try {
	router.post('/', middle_ware, controllers_session_speciality.insert_session_speciality);
}
catch(error){
	res.send( { "error" : "c_r_api_10_session_speciality" , "mesage" : error } );
}



//@@
//@@
//@@
//search
try {
	router.post('/search', middle_ware, controllers_session_speciality.search);
}
catch(error){
	res.send( { "error" : "c_r_api_10_session_speciality" , "mesage" : error } );
}

//@@
//@@
//@@
//get all 
try {
	router.get('/', middle_ware, controllers_session_speciality.get_all_session_speciality);
}
catch(error){
	res.send( { "error" : "c_r_api_11_session_speciality" , "mesage" : error } );
}



//@@
//@@
//@@
//update
try {
	router.put('/', middle_ware, controllers_session_speciality.update_session_speciality);
}
catch(error){
	res.send( { "error" : "c_r_api_13_session_speciality" , "mesage" : error } );
}



//@@
//@@
//@@
//delete
try {
	router.delete('/', middle_ware, controllers_session_speciality.delete_session_speciality);
}
catch(error){
	res.send( { "error" : "c_r_api_13_session_speciality" , "mesage" : error } );
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