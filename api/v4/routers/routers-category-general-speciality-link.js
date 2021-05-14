
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
var controllers_category_general_speciality_link = require('../controllers/controllers-category-general-speciality-link');


/*
router.get('/', function(req, res, next) {
	res.send({ "title" : "welcome" });
});

*/

//@@
//@@
//@@
//insert 
try {
	router.post('/', middle_ware, controllers_category_general_speciality_link.insert_category_general_speciality_link);
}
catch(error){
	res.send( { "error" : "c_r_api_10_category_general_speciality_link" , "mesage" : error } );
}
//@@
//@@
//@@
//get all 
try {
	router.get('/', middle_ware, controllers_category_general_speciality_link.get_all_category_general_speciality_link);
}
catch(error){
	res.send( { "error" : "c_r_api_11_category_general_speciality_link" , "mesage" : error } );
}

//@@
//@@
//@@
//get one
try {
	router.get('/:link_id', middle_ware, controllers_category_general_speciality_link.get_one_category_general_speciality_link);
}
catch(error){
	res.send( { "error" : "c_r_api_12_category_general_speciality_link" , "mesage" : error } );
}

//@@
//@@
//@@
//update
try {
	router.put('/:link_id', middle_ware, controllers_category_general_speciality_link.update_category_general_speciality_link);
}
catch(error){
	res.send( { "error" : "c_r_api_10_category_general_speciality_link" , "mesage" : error } );
}
//@@
//@@
//@@
//@@
//@@
//delete
try {
	router.delete('/:link_id', middle_ware, controllers_category_general_speciality_link.delete_category_general_speciality_link);
}
catch(error){
	res.send( { "error" : "c_r_api_11_category_general_speciality_link" , "mesage" : error } );
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
	router.post('/search', middle_ware, controllers_category_general_speciality_link.search);
}
catch(error){
	res.send( { "error" : "c_r_api_11_category_general_speciality_link" , "mesage" : error } );
}
//@@
//@@




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