

/*
@@@@
@@@@@
@@@@@
@@@@@
*/

var express = require('express');
var router = express.Router();

//chuyen huong controller 
var controllers_token = require('../controllers/controllers-token');


//@@
//@@
//@@
//search
try {
	router.post('/search',  controllers_token.search);
}
catch(error){
	res.send( { "error" : "c_r_api_13_token_search" , "mesage" : error } );
}


//@@
//@@
//@@
//insert
try {
	router.post('/',  controllers_token.insert_token);
}
catch(error){
	res.send( { "error" : "c_r_api_10_token" , "mesage" : error } );
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























