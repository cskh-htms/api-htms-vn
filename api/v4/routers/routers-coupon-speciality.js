
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
var controllers_coupon_spaciality = require('../controllers/controllers-coupon-spaciality');








//@@
//@@
//@@
//insert
try {
	router.post('/', middle_ware, controllers_coupon_spaciality.insert_coupon_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_10_coupon_spaciality" , "mesage" : error } );
}



//@@
//@@
//@@
//search
try {
	router.post('/search', middle_ware, controllers_coupon_spaciality.search);
}
catch(error){
	res.send( { "error" : "c_r_api_10_coupon_spaciality" , "mesage" : error } );
}

//@@
//@@
//@@
//get all 
try {
	router.get('/', middle_ware, controllers_coupon_spaciality.get_all_coupon_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_11_coupon_spaciality" , "mesage" : error } );
}

//@@
//@@
//@@
//get one 
try {
	router.get('/:coupon_id', middle_ware, controllers_coupon_spaciality.get_one_coupon_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_12_coupon_spaciality" , "mesage" : error } );
}

//@@
//@@
//@@
//update
try {
	router.put('/:coupon_id', middle_ware, controllers_coupon_spaciality.update_coupon_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_13_coupon_spaciality" , "mesage" : error } );
}


//@@
//@@
//@@
//update
try {
	router.delete('/:coupon_id', middle_ware, controllers_coupon_spaciality.delete_coupon_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_13_coupon_spaciality" , "mesage" : error } );
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