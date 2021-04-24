
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
var controllers_orders_spaciality_detail = require('../controllers/controllers-orders-spaciality-detail');








//@@
//@@
//@@
//insert
try {
	router.post('/', middle_ware, controllers_orders_spaciality_detail.insert_orders_spaciality_detail);
}
catch(error){
	res.send( { "error" : "c_r_api_10_orders_spaciality_detail" , "mesage" : error } );
}



//@@
//@@
//@@
//search
try {
	router.post('/search', middle_ware, controllers_orders_spaciality_detail.search);
}
catch(error){
	res.send( { "error" : "c_r_api_10_orders_spaciality_detail" , "mesage" : error } );
}

//@@
//@@
//@@
//get all 
try {
	router.get('/', middle_ware, controllers_orders_spaciality_detail.get_all_orders_spaciality_detail);
}
catch(error){
	res.send( { "error" : "c_r_api_11_orders_spaciality_detail" , "mesage" : error } );
}

//@@
//@@
//@@
//get one 
try {
	router.get('/:detail_id', middle_ware, controllers_orders_spaciality_detail.get_one_orders_spaciality_detail);
}
catch(error){
	res.send( { "error" : "c_r_api_12_orders_spaciality_detail" , "mesage" : error } );
}

//@@
//@@
//@@
//update
try {
	router.put('/:detail_id', middle_ware, controllers_orders_spaciality_detail.update_orders_spaciality_detail);
}
catch(error){
	res.send( { "error" : "c_r_api_13_orders_spaciality_detail" , "mesage" : error } );
}


//@@
//@@
//@@
//delete
try {
	router.delete('/:detail_id', middle_ware, controllers_orders_spaciality_detail.delete_orders_spaciality_detail);
}
catch(error){
	res.send( { "error" : "c_r_api_13_orders_spaciality_detail" , "mesage" : error } );
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