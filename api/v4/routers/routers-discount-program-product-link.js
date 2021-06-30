
/*

* 1. [insert_discount_program_product_link]

* 2. [get_all_discount_program_product_link]

* 3. [get_one_discount_program_product_link]

* 4. [update_discount_program_product_link]

* 5. [delete_discount_program_product_link]

* 6. [search]




*/









const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
const controllers_discount_program_product_link = require('../controllers/controllers-discount-program-product-link');





//@
//@
//@
//@
//@* 1. [insert_store]
router.post('/', middle_ware, controllers_discount_program_product_link.insert_discount_program_product_link);



//@
//@
//@
//@
//@* 2. [get_all_discount_program_product_link]
router.get('/', middle_ware, controllers_discount_program_product_link.get_all_discount_program_product_link);





//@
//@
//@
//@
//@* 3. [get_one_discount_program_product_link]
router.get('/:discount_program_product_link_id', middle_ware, controllers_discount_program_product_link.get_one_discount_program_product_link);




//@
//@
//@
//@
//@* 4. [update_discount_program_product_link]
router.put('/:discount_program_product_link_id', middle_ware, controllers_discount_program_product_link.update_discount_program_product_link);



//@
//@
//@
//@
//@* 5. [delete_discount_program_product_link]
router.delete('/:discount_program_product_link_id', middle_ware ,controllers_discount_program_product_link.delete_discount_program_product_link);




//@@
//@@
//@@
//6. [search] 
router.post('/search', middle_ware, controllers_discount_program_product_link.search);




















module.exports = router;
