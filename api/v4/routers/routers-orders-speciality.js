
/*




* 1. [insert_ordres_spaciality]

* 2. [get_all_ordres_spaciality]

* 3. [get_one_ordres_spaciality]

* 4. [update_ordres_spaciality]

* 5. [delete_ordres_spaciality]

* 6. [search]

* 7. [search_customer]

* 7. [search_user]

*/

const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');



const controllers_orders_spaciality = require('../controllers/controllers-orders-spaciality');










//@
//@
//@
//@
//@* 1. [insert_ordres_spaciality]
router.post('/', middle_ware, controllers_orders_spaciality.insert_orders_spaciality);





//@
//@
//@
//@
//@* 2. [get_all_ordres_spaciality]
router.get('/', middle_ware, controllers_orders_spaciality.get_all_orders_spaciality);



//@
//@
//@
//@
//@* 3. [get_one_ordres_spaciality]
router.get('/:order_id', middle_ware, controllers_orders_spaciality.get_one_orders_spaciality);




//@
//@
//@
//@
//@* 4. [update_ordres_spaciality]
router.put('/:order_id', middle_ware, controllers_orders_spaciality.update_orders_spaciality);



//@
//@
//@
//@
//@* 5. [delete_ordres_spaciality]
router.delete('/:order_id', middle_ware, controllers_orders_spaciality.delete_orders_spaciality);



//@
//@
//@
//@
//@* 6. [search]
router.post('/search', middle_ware, controllers_orders_spaciality.search);





//@
//@
//@
//@
//@* 7. [search_user]
router.post('/search_customer', middle_ware, controllers_orders_spaciality.search_customer);





//@
//@
//@
//@
//@* 7. [search_user]
router.post('/search_user', middle_ware, controllers_orders_spaciality.search_user);



//@
//@
//@
//@
//@
//@* . [search_count_order_by_user]
router.post('/search-count-order-by-user', middle_ware, controllers_orders_spaciality.search_count_order_by_user);




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