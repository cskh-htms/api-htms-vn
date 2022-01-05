
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
var controllers_comments_spaciality = require('../controllers/controllers-comments-spaciality');








//@@
//@@
//@@
//insert
try {
	router.post('/', middle_ware, controllers_comments_spaciality.insert_comments_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_10_comments_spaciality" , "mesage" : error } );
}



//@@
//@@
//@@
//search
try {
	router.post('/search', middle_ware, controllers_comments_spaciality.search);
}
catch(error){
	res.send( { "error" : "c_r_api_10_comments_spaciality" , "mesage" : error } );
}

//@@
//@@
//@@
//get all 
try {
	router.get('/', middle_ware, controllers_comments_spaciality.get_all_comments_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_11_comments_spaciality" , "mesage" : error } );
}

//@@
//@@
//@@
//get one 
try {
	router.get('/:comment_id', middle_ware, controllers_comments_spaciality.get_one_comments_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_12_comments_spaciality" , "mesage" : error } );
}

//@@
//@@
//@@
//update
try {
	router.put('/:comment_id', middle_ware, controllers_comments_spaciality.update_comments_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_13_comments_spaciality" , "mesage" : error } );
}


//@@
//@@
//@@
//update
try {
	router.delete('/:comment_id', middle_ware, controllers_comments_spaciality.delete_comments_spaciality);
}
catch(error){
	res.send( { "error" : "c_r_api_13_comments_spaciality" , "mesage" : error } );
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