
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
var controllers_category_general_speciality = require('../controllers/controllers-category-general-speciality');


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
	router.post('/', middle_ware, controllers_category_general_speciality.insert_category_general_speciality);
}
catch(error){
	res.send( { "error" : "c_r_api_10_category_general_speciality" , "mesage" : error } );
}
//@@
//@@
//@@
//get all 
try {
	router.get('/', middle_ware, controllers_category_general_speciality.get_all_category_general_speciality);
}
catch(error){
	res.send( { "error" : "c_r_api_11_category_general_speciality" , "mesage" : error } );
}

//@@
//@@
//@@
//get one
try {
	router.get('/:cat_id', middle_ware, controllers_category_general_speciality.get_one_category_general_speciality);
}
catch(error){
	res.send( { "error" : "c_r_api_12_category_general_speciality" , "mesage" : error } );
}

//@@
//@@
//@@
//update
try {
	router.put('/:cat_id', middle_ware, controllers_category_general_speciality.update_category_general_speciality);
}
catch(error){
	res.send( { "error" : "c_r_api_10_category_general_speciality" , "mesage" : error } );
}
//@@
//@@
//@@
//@@
//@@
//delete
try {
	router.delete('/:cat_id', middle_ware, controllers_category_general_speciality.delete_category_general_speciality);
}
catch(error){
	res.send( { "error" : "c_r_api_11_category_general_speciality" , "mesage" : error } );
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
	router.post('/search', middle_ware, controllers_category_general_speciality.search);
}
catch(error){
	res.send( { "error" : "c_r_api_11_category_general_speciality" , "mesage" : error } );
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