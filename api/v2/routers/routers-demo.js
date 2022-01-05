
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
var controllers_demo = require('../controllers/controllers-demo');






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
var controllers_demo = require('../controllers/controllers-demo');









//@@
//@@
//@@
//get all 
try {
	router.get('/', middle_ware, controllers_demo.get_all_demo);
}
catch(error){
	res.send( { "error" : "c_r_api_11_demo" , "mesage" : error } );
}

//@@
//@@
//@@
//search 
try {
	router.post('/search', middle_ware, controllers_demo.search);
}
catch(error){
	res.send( { "error" : "c_r_api_11_demo" , "mesage" : error } );
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
