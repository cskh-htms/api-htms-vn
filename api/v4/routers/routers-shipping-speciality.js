
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
var controllers_shipping_spaciality = require('../controllers/controllers-shipping-spaciality');








//@@
//@@
//@@
//insert
try {
	router.post('/', middle_ware, controllers_shipping_spaciality.insert_shipping_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_10_shipping_spaciality" , "mesage" : error } );
}



//@@
//@@
//@@
//search
try {
	router.post('/search', middle_ware, controllers_shipping_spaciality.search);
}
catch(error){
	res.send( { "error" : "c_r_api_10_shipping_spaciality" , "mesage" : error } );
}

//@@
//@@
//@@
//get all 
try {
	router.get('/', middle_ware, controllers_shipping_spaciality.get_all_shipping_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_11_shipping_spaciality" , "mesage" : error } );
}

//@@
//@@
//@@
//get one 
try {
	router.get('/:shipping_id', middle_ware, controllers_shipping_spaciality.get_one_shipping_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_12_shipping_spaciality" , "mesage" : error } );
}

//@@
//@@
//@@
//update
try {
	router.put('/:shipping_id', middle_ware, controllers_shipping_spaciality.update_shipping_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_13_shipping_spaciality" , "mesage" : error } );
}


//@@
//@@
//@@
//delete
try {
	router.delete('/:shipping_id', middle_ware, controllers_shipping_spaciality.delete_shipping_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_13_shipping_spaciality" , "mesage" : error } );
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