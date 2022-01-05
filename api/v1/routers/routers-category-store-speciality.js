
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
var controllers_category_store_speciality = require('../controllers/controllers-category-store-speciality');


//@@
//@@
//@@
//get all 
try {
	router.get('/', middle_ware, controllers_category_store_speciality.get_all_category_store_speciality);
}
catch(error){
	res.send( { "error" : "c_r_api_11_category_store_speciality" , "mesage" : error } );
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