
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
var controllers_products_spaciality = require('../controllers/controllers-products-spaciality');








//@@
//@@
//@@
//insert
try {
	router.post('/', middle_ware, controllers_products_spaciality.insert_products_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_10_products_spaciality" , "mesage" : error } );
}



//@@
//@@
//@@
//search
try {
	router.post('/search', middle_ware, controllers_products_spaciality.search);
}
catch(error){
	res.send( { "error" : "c_r_api_10_products_spaciality" , "mesage" : error } );
}

//@@
//@@
//@@
//get all 
try {
	router.get('/', middle_ware, controllers_products_spaciality.get_all_products_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_11_products_spaciality" , "mesage" : error } );
}

//@@
//@@
//@@
//get one 
try {
	router.get('/:product_id', middle_ware, controllers_products_spaciality.get_one_products_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_12_products_spaciality" , "mesage" : error } );
}

//@@
//@@
//@@
//update
try {
	router.put('/:product_id', middle_ware, controllers_products_spaciality.update_products_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_13_products_spaciality" , "mesage" : error } );
}


//@@
//@@
//@@
//update
try {
	router.delete('/:product_id', middle_ware, controllers_products_spaciality.delete_products_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_13_products_spaciality" , "mesage" : error } );
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