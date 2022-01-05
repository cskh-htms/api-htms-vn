
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
var controllers_reviews_spaciality = require('../controllers/controllers-reviews-spaciality');








//@@
//@@
//@@
//insert
try {
	router.post('/', middle_ware, controllers_reviews_spaciality.insert_reviews_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_10_reviews_spaciality" , "mesage" : error } );
}



//@@
//@@
//@@
//search
try {
	router.post('/search', middle_ware, controllers_reviews_spaciality.search);
}
catch(error){
	res.send( { "error" : "c_r_api_10_reviews_spaciality" , "mesage" : error } );
}

//@@
//@@
//@@
//get all 
try {
	router.get('/', middle_ware, controllers_reviews_spaciality.get_all_reviews_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_11_reviews_spaciality" , "mesage" : error } );
}

//@@
//@@
//@@
//get one 
try {
	router.get('/:review_id', middle_ware, controllers_reviews_spaciality.get_one_reviews_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_12_reviews_spaciality" , "mesage" : error } );
}

//@@
//@@
//@@
//update
try {
	router.put('/:review_id', middle_ware, controllers_reviews_spaciality.update_reviews_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_13_reviews_spaciality" , "mesage" : error } );
}


//@@
//@@
//@@
//delete
try {
	router.delete('/:review_id', middle_ware, controllers_reviews_spaciality.delete_reviews_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_13_reviews_spaciality" , "mesage" : error } );
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