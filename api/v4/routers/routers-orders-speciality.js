
/*




* 1. [insert_ordres_spaciality]

* 2. [get_all_ordres_spaciality]

* 3. [get_one_ordres_spaciality]

* 4. [update_ordres_spaciality]

* 5. [delete_ordres_spaciality]

* 6. [search]


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




//@* 5. [delete_ordres_spaciality]
router.delete('/:order_id', middle_ware, controllers_orders_spaciality.delete_orders_spaciality);




//@* 6. [search]
router.post('/search', middle_ware, controllers_orders_spaciality.search);





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