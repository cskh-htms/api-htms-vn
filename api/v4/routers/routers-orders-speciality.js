
/*




* 1. [insert_ordres_spaciality]

* 2. [get_all_ordres_spaciality]

* 3. [get_one_ordres_spaciality]

* 4. [update_ordres_spaciality]

* 5. [delete_ordres_spaciality]

* 6. [search]

* 7. [search_customer]

* 7. [search_user]

10. [send-order-sms]

11. [search-order-product-count]

12. [yeu-cau-rut-tien]



13. [search_order_by_coupon]
14. [search_order_by_discount]
15. [search_order_by_product]








*/

const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');



const controllers_orders_spaciality = require('../controllers/controllers-orders-spaciality');








router.post('/webhook-ghtk/', controllers_orders_spaciality.webhook_ghtk);


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
//@* 8. [search_user]
router.post('/search_user', middle_ware, controllers_orders_spaciality.search_user);



//@
//@
//@
//@
//@
//@* 9. [search_count_order_by_user]
router.post('/search-count-order-by-user', middle_ware, controllers_orders_spaciality.search_count_order_by_user);




//@
//@
//@
//@
//@
//@* 10. [send-order-sms]
router.post('/send-order-sms', middle_ware, controllers_orders_spaciality.send_order_sms);


//@
//@
//@
//@
//@
//@* 11. [search-order-product-count]
router.post('/search-order-product-count', middle_ware, controllers_orders_spaciality.search_order_product_count);



//@
//@
//@
//@
//@
//@* 12. [yeu-cau-rut-tien]
router.put('/yeu-cau-rut-tien/:order_id', middle_ware, controllers_orders_spaciality.yeu_cau_rut_tien);


//@
//@
//@
//@
//@
//@* 13. [search_order_by_coupon]
router.post('/search_order_by_coupon', middle_ware, controllers_orders_spaciality.search_order_by_coupon);



//@
//@
//@
//@
//@
//@* 14. [search_order_by_discount]
router.post('/search_order_by_discount', middle_ware, controllers_orders_spaciality.search_order_by_discount);

//@
//@
//@
//@
//@
//@* 15. [yeu-cau-rut-tien]
router.post('/search_order_by_product', middle_ware, controllers_orders_spaciality.search_order_by_product);







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