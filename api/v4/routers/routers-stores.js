
/*

* 1. [insert_store]

* 2. [get_all_stores]

* 3. [get_one_stores]

* 4. [update_stores]











*/








const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
const controllers_stores = require('../controllers/controllers-stores');





//@
//@
//@
//@
//@* 1. [insert_store]
router.post('/', middle_ware, controllers_stores.insert_stores);



//@
//@
//@
//@
//@* 2. [get_all_stores]
router.get('/', middle_ware, controllers_stores.get_all_stores);





//@
//@
//@
//@
//@* 3. [get_one_stores]
router.get('/:store_id', middle_ware, controllers_stores.get_one_stores);




//@
//@
//@
//@
//@* 3. [update_stores]
router.put('/:store_id', middle_ware, controllers_stores.update_stores);




//search
router.post('/search-payment', middle_ware, controllers_stores.search_payment);
//search
router.post('/search', middle_ware, controllers_stores.search);



//update


//delete
router.delete('/:store_id', middle_ware ,controllers_stores.delete_stores);


module.exports = router;
