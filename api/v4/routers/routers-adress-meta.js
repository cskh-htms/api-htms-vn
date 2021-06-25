
/*





* 1. [insert_adress_meta]

* 2. [get_all_adress_meta]

* 3. [get_one_adress_meta]

* 4. [update_adress_meta]

* 5. [delete_adress_meta]

* 6. [search]






*/








const express = require('express');
const router = express.Router();
const middle_ware =  require('./routers-middle-ware');

//chuyen huong controller 
const controllers_adress_meta = require('../controllers/controllers-adress-meta');






//@
//@
//@
//@
//@* 1. [insert_store]
router.post('/', middle_ware, controllers_adress_meta.insert_adress_meta);



//@
//@
//@
//@
//@* 2. [get_all_adress_meta]
router.get('/', middle_ware, controllers_adress_meta.get_all_adress_meta);





//@
//@
//@
//@
//@* 3. [get_one_adress_meta]
router.get('/:adress_id', middle_ware, controllers_adress_meta.get_one_adress_meta);




//@
//@
//@
//@
//@* 4. [update_adress_meta]
router.put('/:adress_id', middle_ware, controllers_adress_meta.update_adress_meta);



//@
//@
//@
//@
//@* 5. [delete_adress_meta]
router.delete('/:adress_id', middle_ware ,controllers_adress_meta.delete_adress_meta);




//@@
//@@
//@@
//6. [search] 
router.post('/search', middle_ware, controllers_adress_meta.search);




















module.exports = router;
