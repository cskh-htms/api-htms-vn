
/*




* 1. [insert_option_speciality]

* 2. [get_all_option_speciality]

* 3. [get_one_option_speciality]


*/

const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');


const controllers_options_speciality = require('../controllers/controllers-options-speciality');








//@
//@
//@
//@
//@* 1. [insert_option_speciality]
router.post('/', middle_ware, controllers_options_speciality.insert_option_speciality);




//@
//@
//@
//@
//@* 2. [get_all_option_speciality]
router.get('/', middle_ware, controllers_options_speciality.get_all_option_speciality);




//@
//@
//@
//@
//@* 3. [get_one_option_speciality]
router.get('/:option_id', middle_ware, controllers_options_speciality.get_one_option_speciality);





//@@
//@@
//@@
//update
try {
	router.put('/:option_id', middle_ware, controllers_options_speciality.update_option_speciality);
}
catch(error){
	res.send( { "error" : "c_r_api_13_options_speciality" , "mesage" : error } );
}


//@@
//@@
//@@
//update
try {
	router.delete('/:option_id', middle_ware, controllers_options_speciality.delete_option_speciality);
}
catch(error){
	res.send( { "error" : "c_r_api_13_options_speciality" , "mesage" : error } );
}

//@@
//@@
//@@
//update
try {
	router.post('/search', middle_ware, controllers_options_speciality.search);
}
catch(error){
	res.send( { "error" : "c_r_api_13_options_speciality" , "mesage" : error } );
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