
/*


* 1. [insert_ordres_spaciality_details]

* 2. [update_ordres_spaciality_details]

* 3. [delete_ordres_spaciality_details]


*/

const express = require('express');
const  router = express.Router();
const  middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
const  controllers_orders_spaciality_detail = require('../controllers/controllers-orders-spaciality-detail');







//@
//@
//@
//@
//@
//@
//@ * 1. [insert_orders_spaciality_detail]
router.post('/', middle_ware, controllers_orders_spaciality_detail.insert_orders_spaciality_detail);






//@
//@
//@
//@
//@
//@
//@ * 2. [update_orders_spaciality_detail]
router.put('/:detail_id', middle_ware, controllers_orders_spaciality_detail.update_orders_spaciality_detail);







//@
//@
//@
//@
//@
//@
//@ * 3. [delete_orders_spaciality_detail]
router.delete('/:detail_id', middle_ware, controllers_orders_spaciality_detail.delete_orders_spaciality_detail);





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