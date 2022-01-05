
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
var controllers_brands = require('../controllers/controllers-brands');








//@@
//@@
//@@
//insert
try {
	router.post('/', middle_ware, controllers_brands.insert_brands);
}
catch(error){
	res.send( { "error" : "c_r_api_10_brands" , "mesage" : error } );
}
//@@
//@@
//@@
//get all 
try {
	router.get('/', middle_ware, controllers_brands.get_all_brands);
}
catch(error){
	res.send( { "error" : "c_r_api_11_brands" , "mesage" : error } );
}

//@@
//@@
//@@
//get one 
try {
	router.get('/:brand_id', middle_ware, controllers_brands.get_one_brands);
}
catch(error){
	res.send( { "error" : "c_r_api_12_brands" , "mesage" : error } );
}

//@@
//@@
//@@
//update
try {
	router.put('/:brand_id', middle_ware, controllers_brands.update_brands);
}
catch(error){
	res.send( { "error" : "c_r_api_13_brands" , "mesage" : error } );
}


//@@
//@@
//@@
//delete
try {
	router.delete('/:brand_id', middle_ware, controllers_brands.delete_brands);
}
catch(error){
	res.send( { "error" : "c_r_api_13_brands" , "mesage" : error } );
}

//@@
//@@
//@@
//search
try {
	router.post('/search', middle_ware, controllers_brands.search);
}
catch(error){
	res.send( { "error" : "c_r_api_13_brands" , "mesage" : error } );
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