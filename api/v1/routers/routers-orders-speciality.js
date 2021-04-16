
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
var controllers_orders_spaciality = require('../controllers/controllers-orders-spaciality');








//@@
//@@
//@@
//insert
try {
	router.post('/', middle_ware, controllers_orders_spaciality.insert_orders_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_10_orders_spaciality" , "mesage" : error } );
}

//@@
//@@
//@@
//insert
try {
	router.post('/app', middle_ware, controllers_orders_spaciality.insert_orders_spaciality_app);
}
catch(error){
	res.send( { "error" : "c_r_api_10_orders_spaciality" , "mesage" : error } );
}


//@@
//@@
//@@
//search
try {
	router.post('/search', middle_ware, controllers_orders_spaciality.search);
}
catch(error){
	res.send( { "error" : "c_r_api_10_orders_spaciality" , "mesage" : error } );
}


//@@
//@@
//@@
//search
try {
	router.post('/search_view', middle_ware, controllers_orders_spaciality.search_view);
}
catch(error){
	res.send( { "error" : "c_r_api_10_orders_spaciality_search_view" , "mesage" : error } );
}


//@@
//@@
//@@
//get all 
try {
	router.get('/', middle_ware, controllers_orders_spaciality.get_all_orders_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_11_orders_spaciality" , "mesage" : error } );
}

//@@
//@@
//@@
//get one 
try {
	router.get('/:order_id', middle_ware, controllers_orders_spaciality.get_one_orders_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_12_orders_spaciality" , "mesage" : error } );
}

//@@
//@@
//@@
//update
try {
	router.put('/:order_id', middle_ware, controllers_orders_spaciality.update_orders_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_13_orders_spaciality" , "mesage" : error } );
}


//@@
//@@
//@@
//delete
try {
	router.delete('/:order_id', middle_ware, controllers_orders_spaciality.delete_orders_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_13_orders_spaciality" , "mesage" : error } );
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