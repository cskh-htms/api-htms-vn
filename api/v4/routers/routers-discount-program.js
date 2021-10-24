
/*

* 1. [insert_discount_program]

* 2. [get_all_discount_program]

* 3. [get_one_discount_program]

* 4. [update_discount_program]

* 5. [delete_discount_program]

* 6. [search]

* 7. [search_discount_program_sale]






*/








const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
const controllers_discount_program = require('../controllers/controllers-discount-program');





//@
//@
//@
//@
//@* 1. [insert_store]
router.post('/', middle_ware, controllers_discount_program.insert_discount_program);



//@
//@
//@
//@
//@* 2. [get_all_discount_program]
router.get('/', middle_ware, controllers_discount_program.get_all_discount_program);





//@
//@
//@
//@
//@* 3. [get_one_discount_program]
router.get('/:discount_program_id', middle_ware, controllers_discount_program.get_one_discount_program);




//@
//@
//@
//@
//@* 4. [update_discount_program]
router.put('/:discount_program_id', middle_ware, controllers_discount_program.update_discount_program);



//@
//@
//@
//@
//@* 5. [delete_discount_program]
router.delete('/:discount_program_id', middle_ware ,controllers_discount_program.delete_discount_program);




//@@
//@@
//@@
//6. [search] 
router.post('/search', middle_ware, controllers_discount_program.search);



//@@
//@@
//@@
//7. [search_discount_program_sale] 
router.post('/search_discount_program_sale', middle_ware, controllers_discount_program.search_discount_program_sale);
















module.exports = router;
