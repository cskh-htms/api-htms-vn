
/*




* 1. [insert_option_speciality]

* 2. [get_all_option_speciality]

* 3. [get_one_option_speciality]

* 4. [update_option_speciality]


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






//@
//@
//@
//@
//@* 4. [update_option_speciality]
router.put('/:option_id', middle_ware, controllers_options_speciality.update_option_speciality);




//@
//@
//@
//@
//@* 5. [delete_option_speciality]
router.delete('/:option_id', middle_ware, controllers_options_speciality.delete_option_speciality);



//@
//@
//@
//@
//@* 6. [search]
router.post('/search', middle_ware, controllers_options_speciality.search);








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