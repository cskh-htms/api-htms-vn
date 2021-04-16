

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
var controllers_service_type = require('../controllers/controllers-service-type');



//@@
//@@
//get all 
try {
	router.get('/', middle_ware, controllers_service_type.get_all_service_type);
}
catch(error){
	res.send( { "error" : "c_r_api_11_service_type" , "mesage" : error } );
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



























