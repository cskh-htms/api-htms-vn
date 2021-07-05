
/*




* 1. [insert_like_product]

* 2. [get_all_like_product]

* 3. [get_one_like_product]

* 4. [update_like_product]

* 5. [delete_like_product]

* 6. [search]





*/








const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
const controllers_like_product = require('../controllers/controllers-like-product');





//@
//@
//@
//@
//@* 1. [insert_store]
router.post('/', middle_ware, controllers_like_product.insert_like_product);



//@
//@
//@
//@
//@* 2. [get_all_like_product]
router.get('/', middle_ware, controllers_like_product.get_all_like_product);





//@
//@
//@
//@
//@* 3. [get_one_like_product]
router.get('/:like_product_id', middle_ware, controllers_like_product.get_one_like_product);




//@
//@
//@
//@
//@* 4. [update_like_product]
router.put('/:like_product_id', middle_ware, controllers_like_product.update_like_product);



//@
//@
//@
//@
//@* 5. [delete_like_product]
router.delete('/:like_product_id', middle_ware ,controllers_like_product.delete_like_product);




//@@
//@@
//@@
//6. [search] 
router.post('/search', middle_ware, controllers_like_product.search);




















module.exports = router;
