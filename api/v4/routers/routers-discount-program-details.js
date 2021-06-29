
/*

* 1. [insert_discount_program_details]

* 2. [get_all_discount_program_details]

* 3. [get_one_discount_program_details]

* 4. [update_discount_program_details]

* 5. [delete_discount_program_details]

* 6. [search]






*/








const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
const controllers_discount_program_details = require('../controllers/controllers-discount-program-details');






//@
//@
//@
//@
//@* 1. [insert_store]
router.post('/', middle_ware, controllers_discount_program_details.insert_discount_program_details);



//@
//@
//@
//@
//@* 2. [get_all_discount_program_details]
router.get('/', middle_ware, controllers_discount_program_details.get_all_discount_program_details);





//@
//@
//@
//@
//@* 3. [get_one_discount_program_details]
router.get('/:discount_program_details_id', middle_ware, controllers_discount_program_details.get_one_discount_program_details);




//@
//@
//@
//@
//@* 4. [update_discount_program_details]
router.put('/:discount_program_details_id', middle_ware, controllers_discount_program_details.update_discount_program_details);



//@
//@
//@
//@
//@* 5. [delete_discount_program_details]
router.delete('/:discount_program_details_id', middle_ware ,controllers_discount_program_details.delete_discount_program_details);




//@@
//@@
//@@
//6. [search] 
router.post('/search', middle_ware, controllers_discount_program_details.search);




















module.exports = router;
