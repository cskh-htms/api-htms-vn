
/*




* 1. [insert_like_store]

* 2. [get_all_like_store]

* 3. [get_one_like_store]

* 4. [update_like_store]

* 5. [delete_like_store]

* 6. [search]





*/








const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
const controllers_like_store = require('../controllers/controllers-like-store');





//@
//@
//@
//@
//@* 1. [insert_store]
router.post('/', middle_ware, controllers_like_store.insert_like_store);



//@
//@
//@
//@
//@* 2. [get_all_like_store]
router.get('/', middle_ware, controllers_like_store.get_all_like_store);





//@
//@
//@
//@
//@* 3. [get_one_like_store]
router.get('/:like_store_id', middle_ware, controllers_like_store.get_one_like_store);




//@
//@
//@
//@
//@* 4. [update_like_store]
router.put('/:like_store_id', middle_ware, controllers_like_store.update_like_store);



//@
//@
//@
//@
//@* 5. [delete_like_store]
router.delete('/:like_store_id', middle_ware ,controllers_like_store.delete_like_store);




//@@
//@@
//@@
//6. [search] 
router.post('/search', middle_ware, controllers_like_store.search);




















module.exports = router;
