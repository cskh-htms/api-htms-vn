
/*




* 1. [insert_products]

* 2. [get_all_products]

* 3. [get_one_products]

* 4. [update_products]

* 5. [delete_products]

* 6. [search]


*/


const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');



const controllers_products_spaciality = require('../controllers/controllers-products-spaciality');






//@
//@
//@
//@
//@ 1. [insert_products]
router.post('/', middle_ware, controllers_products_spaciality.insert_products_spaciality);



//@
//@
//@
//@
//@ 2. [insert_products]



//@
//@
//@
//@
//@ 3. [get_all_products]
router.get('/', middle_ware, controllers_products_spaciality.get_all_products_spaciality);




//@
//@
//@
//@
//@ 4. [get_one_products]
router.get('/:product_id', middle_ware, controllers_products_spaciality.get_one_products_spaciality);


//@
//@
//@
//@
//@ 5. [update_products]
router.put('/:product_id', middle_ware, controllers_products_spaciality.update_products_spaciality);



//@
//@
//@
//@
//@ 6. [delete_products]
router.delete('/:product_id', middle_ware, controllers_products_spaciality.delete_products_spaciality);



//@
//@
//@
//@
//@ 7. [search]
router.post('/search', middle_ware, controllers_products_spaciality.search);





//@
//@
//@
//@
//@ 7. [search]
router.post('/search_all', middle_ware, controllers_products_spaciality.search_all);


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